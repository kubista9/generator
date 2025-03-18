using Depsit.Core.Domain.Entities;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record CreateAchievementResponse
{
    public Guid Id { get; set; }
    public string? Title {  get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public string? CreatedBy { get; set; }
    public string? AssignedTo { get; set; }
    public DateTimeOffset? Reminder { get; set; }
}