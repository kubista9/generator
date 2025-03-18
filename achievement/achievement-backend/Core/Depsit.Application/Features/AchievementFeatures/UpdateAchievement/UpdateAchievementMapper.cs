using AutoMapper;
using Depsit.Core.Domain.Entities;

namespace Depsit.Application.Features.AchievementFeatures;

public class UpdateAchievementMapper : Profile
{
    public UpdateAchievementMapper()
    {
        CreateMap<UpdateAchievementRequest, Achievement>();
        CreateMap<Achievement, UpdateAchievementResponse>();
    }
}