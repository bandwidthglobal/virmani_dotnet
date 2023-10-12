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

        List<DropdownDataDto> NameList(long userId);

        ReferBy GetReferBy(long patientId);

    }
}
