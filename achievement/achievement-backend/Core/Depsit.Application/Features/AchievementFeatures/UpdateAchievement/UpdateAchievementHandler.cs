using AutoMapper;
using Depsit.Application.Features.AchievementFeatures;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

public sealed class UpdateAchievementHandler : IRequestHandler<UpdateAchievementRequest, UpdateAchievementResponse>
{
    private readonly IAchievementRepository<Achievement> _achievementRepository;
    private readonly IUserRepository<User> _userRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateAchievementHandler(
        IAchievementRepository<Achievement> achievementRepository,
        IUserRepository<User> userRepository,
        IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _achievementRepository = achievementRepository;
        _userRepository = userRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<UpdateAchievementResponse> Handle(
        UpdateAchievementRequest request,
        CancellationToken cancellationToken)
    {
        var existingAchievement = await _achievementRepository.GetByIdAsync(request.Id);
        if (existingAchievement == null)
        {
            throw new KeyNotFoundException($"Achievement with ID {request.Id} not found");
        }

        var createdByUser = await _userRepository.GetByIdAsync(request.CreatedBy);
        var assignedToUser = await _userRepository.GetByIdAsync(request.AssignedTo);
        if (createdByUser == null)
        {
            throw new KeyNotFoundException($"CreatedBy user with ID {request.CreatedBy} not found");
        }
        if (assignedToUser == null)
        {
            throw new KeyNotFoundException($"AssignedTo user with ID {request.AssignedTo} not found");
        }

        _mapper.Map(request, existingAchievement);
        var updatedAchievement = await _achievementRepository.UpdateAsync(existingAchievement);
        await _unitOfWork.Save(cancellationToken);
        return _mapper.Map<UpdateAchievementResponse>(updatedAchievement);
    }
}