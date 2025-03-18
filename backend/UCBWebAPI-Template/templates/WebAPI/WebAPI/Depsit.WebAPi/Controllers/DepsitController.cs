using Microsoft.AspNetCore.Mvc;
using Depsit.Application.Services;

namespace Depsit.WebAPi.Controllers;

//[Authorize]
[ApiController]
[Route("api/[controller]")]
//[Microsoft.Identity.Web.Resource.RequiredScope(RequiredScopesConfigurationKey = "AzureAd:Scopes")]
public class DepsitController : ControllerBase
{
    private readonly ILogger<DepsitController> _logger;
    private readonly IDepsitService _depsitWebAPiService;
    private readonly IDepsitCatalogService _depsitWebAPiCatalogService;

    public DepsitController(ILogger<DepsitController> logger, IDepsitService depsitWebAPiService, IDepsitCatalogService depsitWebAPiCatalogService)
    {
        _logger = logger;
        _depsitWebAPiService = depsitWebAPiService;
        _depsitWebAPiCatalogService = depsitWebAPiCatalogService;
    }

    [HttpGet()]
    public async Task<IActionResult> Dummies()
    {
        _logger.LogDebug("Get Dummy Data");
        try
        {
            return Ok(await _depsitWebAPiService.GetDummies());
        }
        catch (Exception ex)
        {
            _logger.LogError("Get Dummy Data ERROR:{ex.Message}", ex.Message);
            return Problem(statusCode: StatusCodes.Status500InternalServerError, detail: ex.Message);
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> WebDummies(string id)
    {
        _logger.LogDebug("Get Dummy Data");
        try
        {
            return Ok(await _depsitWebAPiCatalogService.GetDummy(id));
        }
        catch (Exception ex)
        {
            _logger.LogError("Get Dummy Data ERROR:{ex.Message}", ex.Message);
            return Problem(statusCode: StatusCodes.Status500InternalServerError, detail: ex.Message);
        }

    }
}