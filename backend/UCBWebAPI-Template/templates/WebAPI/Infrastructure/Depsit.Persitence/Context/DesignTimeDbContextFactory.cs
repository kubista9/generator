using Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Depsit.Persistence;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DepsitDbContext>
{
    public DepsitDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<DepsitDbContext>();
        optionsBuilder.UseSqlServer("Server=localhost;Database=Deposits;Trusted_Connection=True;");

        return new DepsitDbContext(optionsBuilder.Options);
    }
}