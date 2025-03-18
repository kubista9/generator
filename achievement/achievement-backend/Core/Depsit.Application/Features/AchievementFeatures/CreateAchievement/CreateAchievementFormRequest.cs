using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record CreateAchievementFormRequest(
    string Title,
    string Description,
    string Status,
    string AssignedTo,
    DateTimeOffset Reminder
    ) : IRequest<CreateAchievementResponse>;

