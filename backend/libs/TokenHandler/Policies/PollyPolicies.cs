using System.Net;
using Polly;
using Polly.Retry;
using TokenHandler.Services;

namespace TokenHandler.Policies;

public static class PollyPolicies
{
    public static readonly AsyncRetryPolicy RetryPolicy = Policy
        .Handle<HttpRequestException>(ex => ex.StatusCode == HttpStatusCode.Unauthorized)
        .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

    public static IAsyncPolicy<HttpResponseMessage> GetTokenRefresher(IServiceProvider provider, HttpRequestMessage request)
    {
        return Policy<HttpResponseMessage>
            .HandleResult(msg => msg.StatusCode == HttpStatusCode.Unauthorized)
            .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromMilliseconds(100), async (_, _, _, _) =>
            {
                await provider.GetRequiredService<ITokenService>().RefreshTokenAsync();
                //request.SetPolicyExecutionContext(new Context());
                //request.GetComponentType().GetMethod("SetPolicyExecutionContext").Invoke(request, new object[] { new Context() });
                request.GetType().GetMethod("SetPolicyExecutionContext")?.Invoke(request, new object[] { new Context() });
            });
    }
}