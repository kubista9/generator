using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.UserFeatures;

public sealed class PatchUserMapper : Profile
{
    public PatchUserMapper()
    {
        CreateMap<PatchUserRequest, User>();
        CreateMap<User, PatchUserResponse>();
    }
}