using MediatR;

namespace Depsit.Application.Features.UserFeatures;
public sealed record  DeleteUserRequest (Guid Id) : IRequest<DeleteUserResponse>;