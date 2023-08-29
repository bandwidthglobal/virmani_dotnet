using AutoMapper;
using DCRM.Common.Dto;
using DCRM.Common.Entity;

namespace DCRM.Api.Mapper
{
    public class EntityToDtoMapping:Profile
    {
        public EntityToDtoMapping() {

            CreateMap<User, UserDto>();

            CreateMap<StaffRequest, StaffDto>();
        }

    }
}
