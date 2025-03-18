using Depsit.Core.Domain.Entities;

namespace Depsit.Application.Features.UserFeatures;

public class GetUserResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
    public List<Achievement>? achievements { get; set; }
}