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
    public interface IPatientService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest authenticateRequest);
        Task<List<PatientseDto>> GetAllAsync();
        Task<PatientseDto> GetByIdAsync(int id);
        List<PatientseDto> GetByUserIdAsync(int userId);
        void CreateAsync(PatientRequest request);
        void Update(PatientRequest request);
        void Delete(int id);
        Task ChangePasswordAsync(ChangePasswordRequest changePasswordModel);
        List<PatientScan> GetPatientScan(int patientId);

        List<LabDataDto> GetPatientLabData(int patientId);

        List<TreatmentplanDto> GetPatientTreatmentplanList(int patientId);

        List<WorkDoneDto> GetPatientWorkDoneList(int patientId);

        List<PaymentHistoryDto> GetPatientpaymentList(int patientId);

        void CreatedWorkDone(Workdone_New workdone);
    }
}
