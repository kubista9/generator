using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures;

public class GetAchievementMapper : Profile
{
    public GetAchievementMapper()
    {
        CreateMap<GetAchievementRequest, Achievement>();
        CreateMap<Achievement, GetAchievementResponse>();
    }
}