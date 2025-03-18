using Microsoft.EntityFrameworkCore;
using Depsit.Application.Repositories;
using Depsit.Infrastructure.Persistence.Repositories;
using Depsit.Infrastructure.Persistence.Context;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Depsit.Persistence.Repositories;

namespace Depsit.Persitence;

public static class ServiceExtensions
{
    public static void ConfigurePersistence(this IServiceCollection services, IConfiguration configuration)
    {

        var connectionString = configuration.GetConnectionString("AchievementDB");
        services.AddDbContext<DepsitDbContext>(opt => opt.UseSqlServer(connectionString));

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped(typeof(IAchievementRepository<>), typeof(AchievementRepository<>));
        services.AddScoped(typeof(IUserRepository<>), typeof(UserRepository<>));
        
 
    }
}