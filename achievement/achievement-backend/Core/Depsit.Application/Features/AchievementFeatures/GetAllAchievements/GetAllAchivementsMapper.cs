using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed class GetAllAchievementsMapper : Profile
{
    public GetAllAchievementsMapper()
    {
        CreateMap<GetAllAchievementsRequest, Achievement>();
        CreateMap<Achievement, GetAllAchievementsResponse>();
    }
}
