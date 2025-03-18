using TokenHandler.Models;

namespace TokenHandler.Services;

public interface ITokenService
{
    Task<Token> GetTokenAsync();
    Task<Token> RefreshTokenAsync();
}
