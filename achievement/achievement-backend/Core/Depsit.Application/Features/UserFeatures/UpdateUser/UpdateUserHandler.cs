using AutoMapper;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.UserFeatures;

public class UpdateUserHandler : IRequestHandler<UpdateUserRequest, UpdateUserResponse>
{
    private readonly IUserRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public UpdateUserHandler(IUserRepository<User> userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UpdateUserResponse> Handle(UpdateUserRequest request, CancellationToken cancellationToken)
    {
        var existingUser = await _userRepository.GetByIdAsync(request.Id);
        if (existingUser == null)
        {
            throw new KeyNotFoundException($"User with ID {request.Id} not found");
        }
        existingUser.Name = request.Name;
        existingUser.Role = request.Role;
        var updatedUser = await _userRepository.UpdateAsync(existingUser);
        return _mapper.Map<UpdateUserResponse>(updatedUser);
    }
}