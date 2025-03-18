using AutoMapper;
using Depsit.Application.Common.Exceptions;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using MediatR;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed class GetAchievementHandler : IRequestHandler<GetAchievementRequest, GetAchievementResponse>
{
    private readonly IAchievementRepository<Achievement> _achievementRepository;
    private readonly IMapper _mapper;

    public GetAchievementHandler(IAchievementRepository<Achievement> achievementRepository, IMapper mapper)
    {
        _achievementRepository = achievementRepository;
        _mapper = mapper;
    }

    public async Task<GetAchievementResponse> Handle(GetAchievementRequest request, CancellationToken cancellationToken)
    {
        var achievement = await _achievementRepository.GetByIdAsync(request.Id) ?? throw new NotFoundException($"Achievement with ID {request.Id} not found");
        return _mapper.Map<GetAchievementResponse>(achievement);
    }
}
