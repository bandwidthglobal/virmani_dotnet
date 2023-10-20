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
    public interface IDoctorRepository
    {
        Task<Doctor> AuthenticateAsync(AuthenticateRequest authenticateRequest);

        IEnumerable<Doctor> GetAll();

        Doctor Get(long id);

        List<DropdownDataDto> NameList(long userId);

        void  Create(DoctorRequest request);

        void Update(DoctorRequest request);

        void Delete(long id);

        void ChangePassword(ChangePasswordRequest changePasswordModel);


        List<Doctor> GetDoctorsByUserId(int userId);

        List<DoctorInsuranceDetail> GetDoctorInsuranceDetailList(int doctorId);

        List<DoctorBankDetail> GetDoctorBankDetailList(int doctorId);

        List<DoctorsVaccination> GetDoctorVaccinationList(int doctorId);

        List<DoctorsAddress> GetDoctorsAddressDetailList(int doctorId);

    } 
}
