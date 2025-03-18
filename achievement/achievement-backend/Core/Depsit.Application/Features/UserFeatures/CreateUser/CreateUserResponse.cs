namespace Depsit.Application.Features.UserFeatures;

public sealed record CreateUserResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
}