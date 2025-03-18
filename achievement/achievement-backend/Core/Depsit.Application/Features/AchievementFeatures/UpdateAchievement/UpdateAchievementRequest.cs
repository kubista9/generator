using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed record UpdateAchievementRequest(
    Guid Id,
    string Title,
    string Description,
    string Status,
    Guid CreatedBy,
    Guid AssignedTo,
    DateTimeOffset Reminder
) : IRequest<UpdateAchievementResponse>;
