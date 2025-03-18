using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.AchievementFeatures;

public class DeleteAchievementMapper : Profile
{
    public DeleteAchievementMapper()
    {
        CreateMap<DeleteAchievementRequest, Achievement>();
        CreateMap<Achievement, DeleteAchievementResponse>();
    }
}