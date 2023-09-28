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
    public interface IPatientRepository
    {
        Task<Patientse> AuthenticateAsync(AuthenticateRequest authenticateRequest);

        Task<IEnumerable<Patientse>> GetAllAsync();

        Task<Patientse> GetByIdAsync(int id);

        Patientse Get(int id);
        List<Patientse> GetByUserId(int userId);

        List<PatientsContact> GetPatientsContacteDetailList(int patientId);

        List<PatientsInsuranceLoan> GetPatientsInsuranceLoanDetailList(int patientId);

        List<PatientTest> GetPatientTestList(int patientId);

        List<Patient_Scans> GetPatientScanList(int patientId);

        void CreateAsync(PatientRequest request);

        void Update(PatientRequest request);

        void Delete(int id);

        Task ChangePatientPasswordAsync(ChangePasswordRequest changePasswordModel);


        List<Patient_Scans> GetPatientScanList();

        List<Lab_Data> GetPatientLabList();

        List<DropdownDataDto> NameList(long userId);
    } 
}
