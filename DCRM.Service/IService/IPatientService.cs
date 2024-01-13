using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;

namespace DCRM.Service.IService
{
    public interface IPatientService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest authenticateRequest);
        List<PatientseDto> GetAll(long userId);
        PatientseDto Get(long id);
        long Create(PatientRequest request);
        void Update(PatientRequest request);
        void Delete(long id);
        void ChangePassword(ChangePasswordRequest changePasswordModel);
        List<Patient_Scans> GetPatientScan(int patientId);

        List<LabDataDto> GetPatientLabData(int patientId);

        List<TreatmentplanDto> GetPatientTreatmentplanList(int patientId);

        List<WorkDoneDto> GetPatientWorkDoneList(int patientId);

        List<PaymentHistoryDto> GetPatientpaymentList(int patientId);

        List<DropdownDataDto> NameAllList(long userId);

        ReferBy GetReferBy(long patientId);

    }
}
