using AutoMapper;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public sealed class GetUserHandler : IRequestHandler<GetUserRequest, GetUserResponse>
{
    private readonly IUserRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public GetUserHandler(IUserRepository<User> userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<GetUserResponse> Handle(GetUserRequest request, CancellationToken cancellationToken)
    {
        var userId = request.Id.ToString();
        var user = await _userRepository.GetByIdAsync(request.Id);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {userId} not found");
        }
        return _mapper.Map<GetUserResponse>(user);
    }
}