using MediatR;
using Depsit.Core.Domain.Entities;
using Depsit.Application.Repositories;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed class CreateAchievementHandler : IRequestHandler<CreateAchievementRequest, CreateAchievementResponse>
{
    private readonly IAchievementRepository<Achievement> _achievementRepository;
    private readonly IUserRepository<User> _userRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CreateAchievementHandler(IAchievementRepository<Achievement> achievementRepository, IUserRepository<User> userRepository, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _achievementRepository = achievementRepository;
        _userRepository = userRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<CreateAchievementResponse> Handle(CreateAchievementRequest request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByUserEmail(request.Email);
        if (user == null)
        {
            var userEntry = await _userRepository.AddAsync(new User { Email = request.Email });
            user = userEntry;
        }
        var achievement = _mapper.Map<Achievement>(request);
        achievement.CreatedBy = user.Entity.Id;
        var achievementEntity = await _achievementRepository.AddAsync(achievement);
        await _unitOfWork.Save(cancellationToken);
        return _mapper.Map<CreateAchievementResponse>(achievementEntity.Entity);
    }
}
