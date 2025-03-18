using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed class CreateAchievementMapper : Profile
{
    public CreateAchievementMapper()
    {
        CreateMap<CreateAchievementRequest, Achievement>();
        CreateMap<Achievement, CreateAchievementResponse>();
    }
}
