using AutoMapper;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public sealed class CreateUserHandler : IRequestHandler<CreateUserRequest, CreateUserResponse>
{
    private readonly IUserRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public CreateUserHandler(IUserRepository<User> userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<CreateUserResponse> Handle(CreateUserRequest request, CancellationToken cancellationToken)
    {
        var user = _mapper.Map<User>(request);
        var userEntity = await _userRepository.AddAsync(user);
        return _mapper.Map<CreateUserResponse>(userEntity);
    }
}