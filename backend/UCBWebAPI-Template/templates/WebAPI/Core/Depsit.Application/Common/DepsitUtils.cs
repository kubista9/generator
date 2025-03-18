using Polly.Extensions.Http;
using Polly;
using System.Text.Json;

namespace Depsit.Application.Common;

public class DepsitUtils
{
    public static async Task<T?> ExtractResponse<T>(HttpResponseMessage response)
    {
        if (response is not null)
        {
            HttpContent content = response.Content;
            using var stream = content.ReadAsStreamAsync();
            
                if (stream is not null)
                {
                    var v = await JsonSerializer.DeserializeAsync<T>(await stream);
                    return v;
                }
                throw new Exception("No HttpResponseMessage content returned");
        }
        else
        {
            throw new Exception("HttpResponseMessage is null");
        }
    }

    public static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
    {
        return HttpPolicyExtensions
            .HandleTransientHttpError()
            .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
            .WaitAndRetryAsync(6, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
    }
}
