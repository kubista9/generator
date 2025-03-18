using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;
using AutoMapper;

namespace Depsit.Application.Features.UserFeatures;

public sealed class DeleteUserHandler : IRequestHandler<DeleteUserRequest, DeleteUserResponse>
{
    private readonly IUserRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public DeleteUserHandler(IUserRepository<User> userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<DeleteUserResponse> Handle(DeleteUserRequest request, CancellationToken cancellationToken)
    {
        var user = _mapper.Map<User>(request);
        await _userRepository.DeleteAsync(request.Id);
        return _mapper.Map<DeleteUserResponse>(user);
    }
}