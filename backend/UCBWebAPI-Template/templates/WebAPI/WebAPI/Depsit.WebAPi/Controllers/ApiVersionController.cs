using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Depsit.WebAPi.Controllers;

[Route("api/version")]
[ApiController]
[AllowAnonymous]
public class ApiVersionController : ControllerBase
{
    /// <summary>
    /// Returns the current version of this Web API
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(string), 200)]
    public IActionResult GetVersion()
    {
        var version = typeof(ApiVersionController).Assembly.GetName().Version;
        return Ok(version is not null ? version.ToString() : "Not Available");
    }
}
