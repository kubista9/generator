using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Net;
using Ucb.Depsit.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

Exception testException = new InvalidOperationException("Test error triggered!");

app.UseErrorHandler
    (
   add => {
       add(testException, HttpStatusCode.InternalServerError);
   });

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

// Example endpoint that throws an exception
app.MapGet("/throw", () =>
{
    throw new InvalidOperationException("Test error triggered!");
});

app.Run();
