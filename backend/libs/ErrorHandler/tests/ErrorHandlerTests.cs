using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Hosting;
using System.Net;
using System.Text.Json;
using Xunit;
using Ucb.Depsit.Middleware;

namespace ErrorHandler.Tests
{
    public class ErrorHandlerTests
    {
        public readonly TestServer _server;
        public readonly HttpClient _client;

        public ErrorHandlerTests()
        {
            // Setup test server
            var hostBuilder = new HostBuilder()
                .ConfigureWebHost(webHost =>
                {
                    webHost.UseTestServer()
                           .Configure(app =>
                           {
                               app.UseErrorHandler();

                               // Test endpoints
                               app.Use(async (context, next) =>
                               {
                                   var path = context.Request.Path.Value;

                                   switch (path)
                                   {
                                       case "/throw-argument":
                                           throw new ArgumentException("Invalid argument");
                                       case "/throw-unauthorized":
                                           throw new UnauthorizedAccessException("Unauthorized");
                                       case "/throw-invalid-operation":
                                           throw new InvalidOperationException("Invalid operation");
                                       case "/throw-key-not-found":
                                           throw new KeyNotFoundException("Not found");
                                       case "/throw-not-supported":
                                           throw new NotSupportedException("Not supported");
                                       case "/throw-unknown":
                                           throw new Exception("Unknown error");
                                       default:
                                           await next(context);
                                           break;
                                   }
                               });
                           });
                });

            var host = hostBuilder.Start();
            _server = host.GetTestServer();
            _client = _server.CreateClient();
        }

        [Theory]
        [InlineData("/throw-argument", HttpStatusCode.BadRequest)]
        [InlineData("/throw-unauthorized", HttpStatusCode.Unauthorized)]
        [InlineData("/throw-invalid-operation", HttpStatusCode.Forbidden)]
        [InlineData("/throw-key-not-found", HttpStatusCode.NotFound)]
        [InlineData("/throw-not-supported", HttpStatusCode.MethodNotAllowed)]
        [InlineData("/throw-unknown", HttpStatusCode.InternalServerError)]
        public async Task ErrorHandler_ReturnsCorrectStatusCode(string path, HttpStatusCode expectedStatusCode)
        {
            // Act
            var response = await _client.GetAsync(path);

            // Assert
            Assert.Equal(expectedStatusCode, response.StatusCode);
        }

        [Fact]
        public void GetErrorMessage_ReturnsInnerExceptionMessage_WhenPresent()
        {
            // Arrange
            var innerException = new Exception("Inner message");
            var exception = new Exception("Outer message", innerException);

            // Act
            var message = ErrorHandlerExtensions.GetErrorMessage(exception);

            // Assert
            Assert.Equal("Inner message", message);
        }
    }

    // Helper class for deserializing error responses
    public class ErrorResponse
    {
        public int StatusCode { get; set; }
        public string Message { get; set; } = string.Empty;
    }

    // Helper class for custom exception test
    public class CustomException : Exception
    {
        public CustomException(string message) : base(message) { }
    }
}