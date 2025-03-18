using Microsoft.Identity.Web;
using Depsit.Presentation.Common;

namespace Depsit.WebAPi.Extensions;

public static class AuthorizePolicyExtensions
{
    public static void ConfigureAuthorizePolicy(this IServiceCollection services, IConfiguration configuration)
    {
        var azureAdConfig = configuration.GetSection("AzureAd");
        services.AddAuthorization(options =>
        {
            options.AddPolicy(AuthorizationRoles.Admin, policy =>
                  policy.RequireRole(azureAdConfig[$"Roles:{AuthorizationRoles.Admin}"]!).RequireScope((azureAdConfig[$"Scopes:{AuthorizationScopes.API}"]!)));

            options.AddPolicy(AuthorizationRoles.User, policy =>
                 policy.RequireRole(azureAdConfig[$"Roles:{AuthorizationRoles.User}"]!).RequireScope(
                     new List<string> { azureAdConfig[$"Scopes:{AuthorizationScopes.API}"]!, azureAdConfig[$"Scopes:{AuthorizationScopes.CLI}"]! }));
        });
    }
}


