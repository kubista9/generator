using Depsit.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record SearchAchievementsRequest(
    AchievementSearchParameters SearchParameters
) : IRequest<SearchAchievementsResponse>;