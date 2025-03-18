using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Depsit.Presentation.Controllers;

public class BaseController : ControllerBase
{
    protected string UserEmail()
    {
        var email = User.FindFirst("preferred_username")?.Value;
        if (email == null)
        {
            throw new Exception("No email found in claims");
        }
        return email;
    }

    protected List<string> UserRoles()
    {
        var roles = User.Claims
    .Where(c => c.Type == ClaimTypes.Role)
    .Select(c => c.Value);
        if (!roles.Any())
        {
            throw new Exception("No roles found in claims");
        }

        //return new List<string> { "classic" };
        return roles.ToList();
    }
}
