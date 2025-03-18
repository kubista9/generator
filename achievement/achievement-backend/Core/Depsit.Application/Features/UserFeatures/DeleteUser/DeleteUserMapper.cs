using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.UserFeatures;

public class DeleteUserMapper : Profile
{
    public DeleteUserMapper()
    {
        CreateMap<DeleteUserRequest, User>();
        CreateMap<User, DeleteUserResponse>();
    }
}
