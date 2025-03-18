namespace Depsit.Application.Features.UserFeatures;

public class UpdateUserResponse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Role { get; set; }
}