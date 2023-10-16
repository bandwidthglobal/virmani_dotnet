using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IUserService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest authenticateRequest);
        IEnumerable<User> GetAll();
         User Get(long id);
        UserDto GetUserChamber(long id);
        long Create(UserRequest userRequest);
        void Update(UserUpdateRequest user);
        void Delete(long id);
        Task ChangeUserPasswordAsync(ChangePasswordRequest changePasswordModel);

        void CreateDiagonosis(Diagonosis diagonosis);

        void UpdateDiagonosis(Diagonosis diagonosis);

        void DeleteDiagonosis(long id);

    }
}
