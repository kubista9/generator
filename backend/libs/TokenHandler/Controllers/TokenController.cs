using TokenHandler.Services;
using Microsoft.AspNetCore.Mvc;

namespace ToklenHandler.Controllers;

public class TokenController : ControllerBase
{
    private readonly IAuth0Service _auth0Service;
    private readonly ITokenService _tokenService;
    private readonly IExternalService<string> _externalService;
    private readonly ILogger<TokenController> _logger;

    public TokenController(
        IAuth0Service auth0Service,
        ITokenService tokenService,
        IExternalService<string> externalService,
        ILogger<TokenController> logger)
    {
        _auth0Service = auth0Service;
        _tokenService = tokenService;
        _externalService = externalService;
        _logger = logger;
    }

    [HttpGet("tokenFromAzure")]
    public async Task<IActionResult> GetTokenFromAzureAd()
    {
        try
        {
            var token = await _auth0Service.GetTokenAsync();
            return Ok(token);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving token from Azure AD");
            return StatusCode(500, $"Error retrieving token from Azure AD: {ex.Message}");
        }
    }

    [HttpGet("tokenFromCache")]
    public async Task<IActionResult> GetTokenFromCache()
    {
        try
        {
            var token = await _tokenService.GetTokenAsync();
            return Ok(token);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving token from cache");
            return StatusCode(500, $"Error retrieving token from cache: {ex.Message}");
        }
    }

    [HttpGet("data")]
    public async Task<IActionResult> GetDataFromUrl([FromQuery] string url)
    {
        if (string.IsNullOrEmpty(url))
        {
            return BadRequest("Please provide some URL.");
        }

        if (!Uri.TryCreate(url, UriKind.Absolute, out var validatedUri) || (validatedUri.Scheme != Uri.UriSchemeHttp && validatedUri.Scheme != Uri.UriSchemeHttps))
        {
            return BadRequest("Invalid URL format. Please provide a valid URL.");
        }

        try
        {
            var data = await _externalService.GetAsync(url);
            return Ok(data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving data from URL: {Url}", url);
            return StatusCode(500, $"Error retrieving data from URL: {ex.Message}");
        }
    }
}
