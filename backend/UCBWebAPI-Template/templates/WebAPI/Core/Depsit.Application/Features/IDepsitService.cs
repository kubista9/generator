using Depsit.Domain.Entities;

namespace Depsit.Application.Services;

public interface IDepsitService
{
    public Task<Dummy[]> GetDummies();

}