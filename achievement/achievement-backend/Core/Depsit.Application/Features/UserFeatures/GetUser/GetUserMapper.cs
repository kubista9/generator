using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.UserFeatures;

public class GetUserMapper : Profile
{
    public GetUserMapper()
    {
        CreateMap<GetUserRequest, User>();
        CreateMap<User, GetUserResponse>();
    }
}