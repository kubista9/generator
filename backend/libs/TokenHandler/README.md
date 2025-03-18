# Token Handler is a C# .NET Core Web API project used for retrieving, storing and forwarding an Access Token

## It allows you to

- Retrieve the JWT from cache
- Get a JWT from Azure AD
- Store the JWT in cache

### Explanation

- TokenRetrievalHandler is a transient class. This HTTP message handler adds an authorization header to outgoing requests
- PollyPolicies is a static class that contains a retry policy for HTTP requests that result in a 401 (Unauthorized) status code
- Auth0CService has the logic for interacting with Azure AD to GET an Access Token using Polly
- TokenService manages the in-memory cache for the Access Token
- TokenController contains the API endpoints

### Additionally

- At the end of this file, you can see an example of a simple external service

# Instructions

## Prerequisites

- Azure Active Directory application
- .NET Core SDK

## Instructions

### 1. Use the library by referencing the package in .csproj file

    <PackageReference Include="TokenHandler" Version="<version>"/>

### 2. Configure the Azure AD application settings in appsettings.json

    "AzureAd": {
    	"ClientSecret": "<your-client-secret>",
    	"ClientId": "<your-client-id>",
    	"TenantId": "<your-tenant-id>",
    	"Scope": "<your-scope>"
    }

### 3. Register the services in your Program.cs or Startup.cs

    ....YourOtherServices
    builder.Services.Configure<AzureAdOptions>(builder.Configuration.GetSection("AzureAd"));
    builder.Services.AddScoped<IAuth0Service, Auth0Service>();
    builder.Services.AddScoped<ITokenService, TokenService>();
    builder.Services.AddTransient<TokenRetrievalHandler>();
    builder.Services.AddHttpClient<IExternalService<string>, ExternalService<string>>().AddHttpMessageHandler<TokenRetrievalHandler>();
    builder.Services.AddMemoryCache();
    ....YourOtherServices

Optionally, in your Program.cs or Startup.cs allow CORS

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
    });

### 2. Run

    dotnet restore

Then build and run the API with

    dotnet run

## Example of ExternalService implementation

### HelloWorldApi Controller

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Logging;
    using System;

    namespace HelloWorldApi.Controllers
    {
        [ApiController]
        [Route("[controller]")]
        public class HelloWorldController : ControllerBase
        {
            private readonly ILogger<HelloWorldController> _logger;

            public HelloWorldController(ILogger<HelloWorldController> logger)
            {
                _logger = logger;
            }

            [HttpGet]
            public IActionResult Get()
            {
                if (Request.Headers.TryGetValue("Authorization", out var authorizationHeader))
                {
                    string authHeader = authorizationHeader.ToString();
                    if (authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                    {
                        string token = authHeader.Substring("Bearer ".Length).Trim();
                        _logger.LogInformation("Received token: {Token}", token);

                        return Ok(new { Message = "Hello World", TokenReceived = true, Token = token });
                    }
                    else
                    {
                        _logger.LogWarning("Authorization header found, but it's not a Bearer token");
                        return BadRequest("Invalid Authorization header format");
                    }
                }
                else
                {
                    _logger.LogWarning("No Authorization header found");
                    return Unauthorized("No token provided");
                }
            }
        }
    }
