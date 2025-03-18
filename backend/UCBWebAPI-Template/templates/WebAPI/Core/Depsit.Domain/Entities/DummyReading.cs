using Depsit.Domain.Entities;

namespace azure.Domain.Entities;

public class DummyReading
{
    public int Id { get; set; }
    public DateTime ReadingTime { get; set; }
    public string Location { get; set; } = string.Empty;
    public double Value { get; set; }
    public int DummyId { get; set; }

    public Dummy Dummy { get; set; } = null!;
}