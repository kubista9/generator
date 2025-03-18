using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record GetAchievementRequest(Guid Id) : IRequest<GetAchievementResponse>;