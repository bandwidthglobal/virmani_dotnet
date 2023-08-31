using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.IRepository
{
    public interface IStaffRepository
    {
        Task<Staff> AuthenticateAsync(AuthenticateRequest authenticateRequest);

        Task<IEnumerable<Staff>> GetStaffsAsync();

        Task<Staff> GetStaffByIdAsync(int id);

        Task SaveStaffAsync(Staff staff);

        Task  CreateStaffByUserAsync(StaffRequest staffRequest);

        void UpdateStaff(StaffRequest staff);

        Task DeleteStaffAsync(int id);

        Task ChangeStaffPasswordAsync(ChangePasswordRequest changePasswordModel);


        List<Staff> GetStaffsByUserId(int userId);

        List<StaffInsuranceDetail> GetStaffInsuranceDetailList(int staffId);

        List<StaffBankDetail> GetStaffBankDetailList(int staffId);

        List<StaffVaccination> GetStaffVaccinationList(int staffId);

    } 
}
