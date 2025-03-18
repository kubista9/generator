using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record GetAllAchievementsRequest(
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<GetAllAchievementsResponse>;