using Microsoft.EntityFrameworkCore;
using azure.Domain.Entities;
using Depsit.Domain.Entities;

namespace Infrastructure.Persistence.Context;

public class DepsitDbContext : DbContext
{
    public DepsitDbContext(DbContextOptions<DepsitDbContext> options)
        : base(options)
    {
    }

    public DbSet<Dummy> Dummies { get; set; }
    public DbSet<DummyReading> DummyReadings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Dummy>().HasData(
            new Dummy
            {
                Id = 1,
                Date = DateTime.Now.ToString("yyyy-MM-dd"),
                TemperatureC = 25,
                Summary = "Warm"
            }
        );

        modelBuilder.Entity<DummyReading>().HasData(
            new DummyReading
            {
                Id = 1,
                DummyId = 1,
                ReadingTime = DateTime.Now,
                Location = "Station 1",
                Value = 25.5
            }
        );
    }
}