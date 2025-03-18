using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record CreateAchievementRequest(
    string Title,
    string Description,
    string Status,
    string Email,
    String AssignedTo,
    DateTimeOffset Reminder
    ) : IRequest<CreateAchievementResponse>;

