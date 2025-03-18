using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public sealed record PatchUserRequest(
    Guid Id,
    string Name,
    string Role
    ) : IRequest<PatchUserResponse>;
