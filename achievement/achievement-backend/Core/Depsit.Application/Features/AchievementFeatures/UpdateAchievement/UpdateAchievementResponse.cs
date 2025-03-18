using Depsit.Core.Domain.Entities;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record UpdateAchievementResponse
{
    public Guid Id { get; init; }
    public string Title { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
    public string? Status { get; init; }
    public Guid CreatedBy { get; init; }
    public Guid AssignedTo { get; init; }
    public DateTimeOffset Reminder { get; init; }
}