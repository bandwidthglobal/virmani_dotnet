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

        IEnumerable<Patientse> GetAll();
        Patientse Get(long id);

        List<PatientsContact> GetPatientsContacteDetailList(int patientId);

        List<PatientsInsuranceLoan> GetPatientsInsuranceLoanDetailList(int patientId);

        List<PatientTest> GetPatientTestList(int patientId);

        List<Patient_Scans> GetPatientScanList(int patientId);

        long Create(PatientRequest request);

        void Update(PatientRequest request);

        void Delete(long id);

        void ChangePatientPassword(ChangePasswordRequest changePasswordModel);


        List<Patient_Scans> GetPatientScanList();

        List<Lab_Data> GetPatientLabList();

        List<DropdownDataDto> NameList(long userId);

        ReferBy GetReferBy(long patientId);
    } 
}
