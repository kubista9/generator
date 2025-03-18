using Depsit.Core.Domain.Entities;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record GetAllAchievementsResponse
{
    public IEnumerable<Achievement> Achievements { get; init; } = new List<Achievement>();
    public int TotalCount { get; init; }
    public int PageNumber { get; init; }
    public int TotalPages { get; init; }
}