using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record DeleteAchievementRequest
    (Guid Id) : IRequest<DeleteAchievementResponse>;