using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record PatchAchievementRequest(
    Guid Id,
    string? Title,
    string? Description,
    string? Status,
    Guid  CreatedBy,
    Guid AssignedTo,
    DateTimeOffset Reminder
) : IRequest<PatchAchievementResponse>;
    