using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public sealed record UpdateUserRequest (
    Guid Id, 
    string Name,
    string Role) : IRequest<UpdateUserResponse>;
