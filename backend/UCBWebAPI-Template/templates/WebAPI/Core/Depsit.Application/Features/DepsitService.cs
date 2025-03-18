using Depsit.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Depsit.Application.Services;

public class DepsitService : IDepsitService
{
    private static readonly string[] Summaries = new[]
{
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<DepsitService> _logger;
    private readonly IConfiguration _configuration;

    public DepsitService(ILogger<DepsitService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public Task<Dummy[]> GetDummies()
    {
        return Task.FromResult(
            Enumerable.Range(1, 5).Select(index => new Dummy
            {
                Date = DateTime.Now.AddDays(index).ToString(),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            }).ToArray()
        );
    }
}