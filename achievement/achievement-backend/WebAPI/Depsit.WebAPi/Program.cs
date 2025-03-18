using Depsit.Application;
using Microsoft.OpenApi.Models;
using Depsit.Persitence;
using Depsit.Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Ucb.Depsit.Middleware;
using Depsit.WebAPi.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;

var systemCode = "DepsitWebAPi";
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins, policy =>
    {
        policy.WithOrigins("http://localhost:4200", "http://localhost:5071")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

builder.Services.ConfigurePersistence(builder.Configuration);
builder.Services.ConfigureApplication();
builder.Services.AddDbContext<DepsitDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.ConfigureAuthorizePolicy(builder.Configuration);
builder.Services.AddLogging(logBuilder => logBuilder.AddApplicationInsights());
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(
     option =>
     {
         option.SwaggerDoc("v1", new OpenApiInfo { Title = $"{systemCode} API", Version = "v1" });
         option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
         {
             In = ParameterLocation.Header,
             Description = "Please enter a valid token",
             Name = "Authorization",
             Type = SecuritySchemeType.Http,
             BearerFormat = "JWT",
             Scheme = "Bearer"
         });
         option.AddSecurityRequirement(new OpenApiSecurityRequirement
         {
            {
                new OpenApiSecurityScheme
                    {
                    Reference = new OpenApiReference
                        {
                          Type=ReferenceType.SecurityScheme,
                          Id="Bearer"
                        }
                     },
                Array.Empty<string>()
            }
        });
     }
 );

builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
    logging.AddDebug();
    logging.AddFilter("Microsoft.AspNetCore.Authorization", LogLevel.Debug);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(x => { x.SwaggerEndpoint("/swagger/v1/swagger.json", $"{systemCode} API"); });
}

var serviceScope = app.Services.CreateScope();
var dataContext = serviceScope.ServiceProvider.GetService<DepsitDbContext>();
await dataContext!.Database.MigrateAsync();

app.UseErrorHandler();
app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();