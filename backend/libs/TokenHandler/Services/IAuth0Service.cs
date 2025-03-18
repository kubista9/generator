using TokenHandler.Models;

namespace TokenHandler.Services;

public interface IAuth0Service
{
    Task<Token> GetTokenAsync();
}