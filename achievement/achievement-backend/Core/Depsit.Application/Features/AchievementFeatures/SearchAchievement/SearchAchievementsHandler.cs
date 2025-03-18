using AutoMapper;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public class SearchAchievementsHandler : IRequestHandler<SearchAchievementsRequest, SearchAchievementsResponse>
{
    private readonly IAchievementRepository<Achievement> _achievementRepository;
    private readonly IMapper _mapper;

    public SearchAchievementsHandler(IAchievementRepository<Achievement> achievementRepository, IMapper mapper)
    {
        _achievementRepository = achievementRepository;
        _mapper = mapper;
    }

    public async Task<SearchAchievementsResponse> Handle(SearchAchievementsRequest request, CancellationToken cancellationToken)
    {
        var (achievements, totalCount) = await _achievementRepository.SearchAchievementsAsync(request.SearchParameters);

        return new SearchAchievementsResponse
        {
            Achievements = achievements,
            TotalCount = totalCount,
            PageNumber = request.SearchParameters.PageNumber,
            TotalPages = (int)Math.Ceiling(totalCount / (double)request.SearchParameters.PageSize)
        };
    }
}
