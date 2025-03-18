using MediatR;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed class DeleteAchievementHandler : IRequestHandler<DeleteAchievementRequest, DeleteAchievementResponse>
{
    private readonly IAchievementRepository<Achievement> _achievementRepository;
    private readonly IMapper _mapper;

    public DeleteAchievementHandler(IAchievementRepository<Achievement> achievementRepository, IMapper mapper)
    {
        _achievementRepository = achievementRepository;
        _mapper = mapper;   
    }

    public async Task<DeleteAchievementResponse> Handle(DeleteAchievementRequest request, CancellationToken cancellationToken)
    {
        var achievement = _mapper.Map<Achievement>(request);
        await _achievementRepository.DeleteAsync(request.Id);
        return _mapper.Map<DeleteAchievementResponse>(achievement);
    }
}