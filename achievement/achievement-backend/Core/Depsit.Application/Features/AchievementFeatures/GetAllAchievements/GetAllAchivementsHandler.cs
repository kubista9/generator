using MediatR;
using Depsit.Core.Domain.Entities;
using Depsit.Application.Repositories;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures.GetAllAchievements;

public sealed class GetAllAchievementsHandler : IRequestHandler<GetAllAchievementsRequest, GetAllAchievementsResponse>
{
    private readonly IAchievementRepository<Achievement> _achievementRepository;
    private readonly IMapper _mapper;

    public GetAllAchievementsHandler(IAchievementRepository<Achievement> achievementRepository, IMapper mapper)
    {
        _achievementRepository = achievementRepository;
        _mapper = mapper;
    }

    public async Task<GetAllAchievementsResponse> Handle(GetAllAchievementsRequest request, CancellationToken cancellationToken)
    {
        var achievements = await _achievementRepository.GetAllAsync(request.PageNumber, request.PageSize);
        var totalCount = await _achievementRepository.CountAsync();
        var totalPages = (int)Math.Ceiling((double)totalCount/ request.PageSize);

        return new GetAllAchievementsResponse
        {
            Achievements = _mapper.Map<IEnumerable<Achievement>>(achievements),
            TotalCount = totalCount,
            PageNumber = request.PageNumber,
            TotalPages = totalPages
        };
    }
}