using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public sealed record CreateUserRequest(
    string Name,
    string Role
    ) : IRequest<CreateUserResponse>;
