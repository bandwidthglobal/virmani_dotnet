using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;

namespace DCRM.Service.IService
{
    public interface IStaffService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest authenticateRequest);
        IEnumerable<Staff> GetAll();
         StaffDto Get(int id);
        long Create(StaffRequest staff);
        void UpdateStaff(StaffRequest user);
        void Delete(int id);
        Task ChangeStaffPasswordAsync(ChangePasswordRequest changePasswordModel);

        List<StaffDto> GetStaffsByUserId(int userId);
       
    }
}
