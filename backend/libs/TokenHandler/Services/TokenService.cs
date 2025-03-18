using TokenHandler.Models;
using Microsoft.Extensions.Caching.Memory;
using TokenHandler.Policies;

namespace TokenHandler.Services;

public class TokenService : ITokenService
{
    private readonly IMemoryCache _memoryCache;
    private readonly IAuth0Service _auth0Service;
    private const string CacheKey = "AccessToken";

    public TokenService(IMemoryCache memoryCache, IAuth0Service auth0Service)
    {
        _memoryCache = memoryCache;
        _auth0Service = auth0Service;
    }

    public async Task<Token> GetTokenAsync()
    {
        return await PollyPolicies.RetryPolicy.ExecuteAsync(async () =>
        {
            if (_memoryCache.TryGetValue(CacheKey, out Token? cachedToken) &&
        cachedToken?.ExpirationTime > DateTime.UtcNow)
            {
                return cachedToken;
            }

            var refreshedToken = await RefreshTokenAsync();

            if (refreshedToken == null ||
                string.IsNullOrWhiteSpace(refreshedToken.AccessToken) ||
                string.IsNullOrWhiteSpace(refreshedToken.Scheme))
            {
                throw new InvalidOperationException("Failed to retrieve a valid token");
            }

            return refreshedToken;
        });
    }

    public async Task<Token> RefreshTokenAsync()
    {
        var token = await _auth0Service.GetTokenAsync();
        if (token != Token.Empty)
        {
            var expiresIn = token.ExpiresIn > 0 ? token.ExpiresIn - 10 : token.ExpiresIn;
            token.Scheme = "Bearer";
            _memoryCache.Set(CacheKey, token,
                new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(5))
                    .SetAbsoluteExpiration(TimeSpan.FromSeconds(expiresIn)));
        }
        return token;
    }
}
