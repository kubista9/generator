using AutoMapper;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public sealed class PatchUserHandler : IRequestHandler<PatchUserRequest, PatchUserResponse>
{
    private readonly IUserRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public PatchUserHandler(IUserRepository<User> userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<PatchUserResponse> Handle(PatchUserRequest request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByIdAsync(request.Id);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with ID {request.Id} not found");
        }

        _mapper.Map(request, user);
        await _userRepository.UpdateAsync(user);
        return _mapper.Map<PatchUserResponse>(user);
    }
}