using AutoMapper;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed class PatchAchievementHandler : IRequestHandler<PatchAchievementRequest, PatchAchievementResponse>
{
    private readonly IAchievementRepository<Achievement> _achievementRepository;
    private readonly IMapper _mapper;

    public PatchAchievementHandler(IAchievementRepository<Achievement> achievementRepository, IMapper mapper)
    {
        _achievementRepository = achievementRepository;
        _mapper = mapper;
    }

    public async Task<PatchAchievementResponse> Handle(PatchAchievementRequest request, CancellationToken cancellationToken)
    {
        var achievement = _mapper.Map<Achievement>(request);
        await _achievementRepository.UpdateAsync(achievement);
        return _mapper.Map<PatchAchievementResponse>(achievement);
    }
}
