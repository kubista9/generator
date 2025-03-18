using Depsit.Application.Common;
using Depsit.Domain.Entities;

namespace Depsit.Application.Services;

public class DepsitCatalogService : IDepsitCatalogService
{
    private readonly HttpClient _httpClient;

    public DepsitCatalogService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<Dummy?> GetDummy(string id)
    {
        var response = await _httpClient.GetAsync(DepsitPathEnums.Dummies(id));
        return await DepsitUtils.ExtractResponse<Dummy>(response);
     
    }
}
