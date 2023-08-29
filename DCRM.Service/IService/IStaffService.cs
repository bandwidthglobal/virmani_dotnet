using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
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
    public interface IStaffService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest authenticateRequest);
        Task<IEnumerable<Staff>> GetStaffsAsync();
         Task<StaffDto> GetStaffByIdAsync(int id);
        Task SaveStaffAsync(StaffRequest staff);

        Task CreateStaffByUserAsync(StaffRequest staff);

        void UpdateStaff(StaffRequest user);
        Task DeleteStaffAsync(int id);
        Task ChangeStaffPasswordAsync(ChangePasswordRequest changePasswordModel);

        List<StaffDto> GetStaffsByUserId(int userId);
       
    }
}
