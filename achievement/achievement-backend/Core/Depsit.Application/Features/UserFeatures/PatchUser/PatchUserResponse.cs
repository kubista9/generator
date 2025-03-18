namespace Depsit.Application.Features.UserFeatures;

public sealed record PatchUserResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
}