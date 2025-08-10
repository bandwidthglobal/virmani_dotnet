using DCRM.Common;
using DCRM.Common.Entity;
using DCRM.Common.Request;

namespace DCRM.Repository.IRepository
{
    public interface IStaffRepository
    {
        Task<Staff> AuthenticateAsync(AuthenticateRequest authenticateRequest);

        IEnumerable<Staff> GetAll();

        Staff Get(int id);

        //Task SaveStaffAsync(Staff staff);

        long Create(StaffRequest staffRequest);

        void Update(StaffRequest staff);

        void Delete(int id);

        Task ChangeStaffPasswordAsync(ChangePasswordRequest changePasswordModel);


        List<Staff> GetStaffsByUserId(int userId);

        List<StaffInsuranceDetail> GetStaffInsuranceDetailList(int staffId);

        List<StaffBankDetail> GetStaffBankDetailList(int staffId);

        List<StaffVaccination> GetStaffVaccinationList(int staffId);

    } 
}
