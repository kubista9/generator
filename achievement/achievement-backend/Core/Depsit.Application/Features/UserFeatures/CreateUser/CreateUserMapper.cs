using Depsit.Core.Domain.Entities;
using AutoMapper;

namespace Depsit.Application.Features.UserFeatures;

public sealed class CreateUserMapper : Profile
{
    public CreateUserMapper()
    {
        CreateMap<CreateUserRequest, User>();   
        CreateMap<User, CreateUserResponse>();
    }
}