using Depsit.Core.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Depsit.Infrastructure.Persistence.Context;

public class DepsitDbContext : DbContext
{
    public DepsitDbContext(DbContextOptions<DepsitDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Achievement>()
            .HasOne<User>()
            .WithMany(a => a.CreatedAchievements)
            .HasForeignKey(u => u.CreatedBy)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Achievement>()
            .HasOne<User>()
            .WithMany(a => a.AssignedAchievements)
            .HasForeignKey(u => u.AssignedTo)
            .OnDelete(DeleteBehavior.Restrict);
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Achievement> Achievements { get; set; }
}