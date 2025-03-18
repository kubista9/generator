using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;

namespace Ucb.Depsit.Middleware
{
    public static class ErrorHandlerExtensions
    {
        // Dictionary to map exception types to HTTP status codes
        public static readonly Dictionary<Type, HttpStatusCode> ExceptionStatusCodes = new()
        {
            { typeof(ArgumentException), HttpStatusCode.BadRequest }, // 400
            { typeof(UnauthorizedAccessException), HttpStatusCode.Unauthorized }, //401
            { typeof(InvalidOperationException), HttpStatusCode.Forbidden }, // 403
            { typeof(KeyNotFoundException), HttpStatusCode.NotFound }, // 404
            { typeof(NotSupportedException), HttpStatusCode.MethodNotAllowed }, // 500
        };

        public static string GetErrorMessage(Exception error)
        {
            if (error is not null && error.InnerException is not null)
            {
                return error.InnerException.Message;
            }
            return error!.Message;
        }

        public static void UseErrorHandler(this IApplicationBuilder app)
        {
            _UseErrorHandler(app);
        }

        public static void Add(Exception exception, HttpStatusCode code)
        {
            var type = exception.GetType();
            if (ExceptionStatusCodes.TryGetValue(type, out HttpStatusCode _))
            {
                ExceptionStatusCodes.Remove(type);
            }
            ExceptionStatusCodes.Add(exception.GetType(), code);
        }

        public static void UseErrorHandler(this IApplicationBuilder app, Action<Action<Exception, HttpStatusCode>> options)
        {
            options(Add);
            _UseErrorHandler(app);
        }

        private static void _UseErrorHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature == null)
                    {
                        return;
                    }

                    context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
                    context.Response.ContentType = "application/json";

                    var found = ExceptionStatusCodes.TryGetValue(contextFeature.Error.GetType(), out HttpStatusCode statusCodeVal);
                    if (!found)
                    {
                        statusCodeVal = HttpStatusCode.InternalServerError;
                    }

                    context.Response.StatusCode = (int)statusCodeVal;
                    var errorResponse = new
                    {
                        statusCode = context.Response.StatusCode,
                        message = $"{contextFeature.Error.GetBaseException().Message}"
                    };

                    await context.Response.WriteAsync(JsonSerializer.Serialize(errorResponse));
                });
            });
        }
    }
}
