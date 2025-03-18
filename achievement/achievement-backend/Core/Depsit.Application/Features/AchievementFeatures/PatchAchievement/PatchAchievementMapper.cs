using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures;

public sealed class PatchAchievementMapper : Profile
{
    public PatchAchievementMapper()
    {
        CreateMap<PatchAchievementRequest, Achievement>();
        CreateMap<Achievement, PatchAchievementResponse>();
    }
}