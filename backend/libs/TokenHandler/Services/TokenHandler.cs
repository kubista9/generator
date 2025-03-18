using System.Net.Http.Headers;

namespace TokenHandler.Services;
public class TokenRetrievalHandler : DelegatingHandler
{
    private readonly ITokenService _tokenService;

    public TokenRetrievalHandler(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var token = await _tokenService.GetTokenAsync();
        if (token == null || string.IsNullOrWhiteSpace(token.AccessToken) || string.IsNullOrWhiteSpace(token.Scheme))
        {
            throw new ArgumentNullException(nameof(token), "Token and scheme must not be null or empty.");
        }
        request.Headers.Authorization = new AuthenticationHeaderValue(token.Scheme, token.AccessToken);
        return await base.SendAsync(request, cancellationToken);
    }
}