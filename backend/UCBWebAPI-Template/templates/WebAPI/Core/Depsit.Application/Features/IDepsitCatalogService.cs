using Depsit.Domain.Entities;

namespace Depsit.Application.Services;

public interface IDepsitCatalogService
{
    public Task<Dummy?> GetDummy(string id);
}
