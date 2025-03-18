using AutoMapper;
using Depsit.Core.Domain.Entities;

namespace Depsit.Application.Features.UserFeatures;

public class UpdateUserMapper : Profile
{
    public UpdateUserMapper()
    {
        CreateMap<UpdateUserRequest, User>();
        CreateMap<User, UpdateUserResponse>();
    }
}