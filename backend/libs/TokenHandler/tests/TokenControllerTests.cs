using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Moq;
using TokenHandler.Services;
using TokenHandler.Models;
using ToklenHandler.Controllers;

namespace TokenHandler.Tests
{
    public class TokenControllerTests
    {
        [Fact]
        public async Task GetTokenFromAzureAd_ReturnsOkResult_WithValidToken()
        {
            // Arrange
            var mockAuth0Service = new Mock<IAuth0Service>();
            mockAuth0Service.Setup(s => s.GetTokenAsync()).ReturnsAsync(new Token());

            var controller = new TokenController(mockAuth0Service.Object, null, null, null);

            // Act
            var result = await controller.GetTokenFromAzureAd();

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetTokenFromAzureAd_ReturnsInternalServerError_WhenExceptionThrown()
        {
            // Arrange
            var mockAuth0Service = new Mock<IAuth0Service>();
            mockAuth0Service.Setup(s => s.GetTokenAsync()).Throws(new Exception());

            var controller = new TokenController(mockAuth0Service.Object, null, null, null);

            // Act
            var result = await controller.GetTokenFromAzureAd();

            // Assert
            Assert.IsType<StatusCodeResult>(result);
            Assert.Equal(500, ((StatusCodeResult)result).StatusCode);
        }

        [Fact]
        public async Task GetDataFromUrl_ReturnsOkResult_WithValidData()
        {
            // Arrange
            var mockExternalService = new Mock<IExternalService<string>>();
            mockExternalService.Setup(e => e.GetAsync(It.IsAny<string>())).ReturnsAsync("Test data");

            var controller = new TokenController(null, null, mockExternalService.Object, null);

            // Act
            var result = await controller.GetDataFromUrl("https://example.com");

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetDataFromUrl_ReturnsBadRequest_WithInvalidUrl()
        {
            // Arrange
            var controller = new TokenController(null, null, null, null);

            // Act
            var result = await controller.GetDataFromUrl("invalid url");

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public async Task GetTokenFromCache_ReturnsOkResult_WithValidToken()
        {
            // Arrange
            var mockTokenService = new Mock<ITokenService>();
            mockTokenService.Setup(s => s.GetTokenAsync()).ReturnsAsync(new Token());

            var controller = new TokenController(null, mockTokenService.Object, null, null);

            // Act
            var result = await controller.GetTokenFromCache();

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async Task GetTokenFromCache_ReturnsInternalServerError_WhenExceptionThrown()
        {
            // Arrange
            var mockTokenService = new Mock<ITokenService>();
            mockTokenService.Setup(s => s.GetTokenAsync()).Throws(new Exception());

            var controller = new TokenController(null, mockTokenService.Object, null, null);

            // Act
            var result = await controller.GetTokenFromCache();

            // Assert
            Assert.IsType<StatusCodeResult>(result);
            Assert.Equal(500, ((StatusCodeResult)result).StatusCode);
        }
    }
}

