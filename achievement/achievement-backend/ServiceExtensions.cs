using Depsit.Application.Features.AchievementFeatures;
using Depsit.Application.Features.UserFeatures;
using Depsit.Application.Repositories;
using Depsit.Infrastructure.Persistence.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Depsit.Persitence;

public static class ServiceExtensions
{
    public static void ConfigurePersistence(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped(typeof(IAchievementRepository<>), typeof(AchievementRepository<>));
        services.AddScoped(typeof(IUserRepository<>), typeof(UserRepository<>));
        services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateAchievementHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DeleteAchievementHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAchievementHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(PatchAchievementHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(SearchAchievementHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UpdateAchievementHandler).Assembly));

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateUserHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(PatchUserHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetUserHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(CreateUserHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(DeleteUserHandler).Assembly));
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(UpdateUserHandler).Assembly));
    }
}