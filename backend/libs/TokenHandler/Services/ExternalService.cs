
using TokenHandler.Policies;

namespace TokenHandler.Services;

public class ExternalService<T> : IExternalService<T>
{
    private readonly HttpClient _httpClient;

    public ExternalService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string?> GetAsync(string endpoint)
    {
        var response = await PollyPolicies.RetryPolicy.ExecuteAsync(async () =>
            await _httpClient.GetAsync(endpoint));
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}
