using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public sealed record GetUserRequest(Guid Id) : IRequest<GetUserResponse>;
