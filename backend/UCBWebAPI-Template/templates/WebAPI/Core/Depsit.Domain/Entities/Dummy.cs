using azure.Domain.Entities;
using System.Text.Json.Serialization;

namespace Depsit.Domain.Entities;

public class Dummy
{
    public int Id { get; set; }

    [JsonPropertyName("date")]
    public string Date { get; set; } = string.Empty;

    [JsonPropertyName("temperatureC")]
    public double TemperatureC { get; set; }

    [JsonPropertyName("temperatureF")]
    public double TemperatureF => 32 + (TemperatureC / 0.5556);

    [JsonPropertyName("summary")]
    public string? Summary { get; set; }
    public ICollection<DummyReading> Readings { get; set; } = new List<DummyReading>();
}