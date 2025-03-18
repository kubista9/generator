using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Depsit.Application.Common.Behaviours;

using System.Reflection;

namespace Depsit.Application;

public static class ServiceExtensions
{
    public static void ConfigureApplication(this IServiceCollection services)
    {

        services.AddSingleton<ILoggerFactory, LoggerFactory>();
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(
            cfg =>
            {
                cfg.AddOpenBehavior(typeof(LoggingBehavior<,>));
                cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
            }) ;
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
    }
}