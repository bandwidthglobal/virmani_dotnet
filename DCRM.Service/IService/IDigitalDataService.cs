using DCRM.Common.Entity;

namespace DCRM.Service.IService
{
    public interface IDigitalDataService
    {
        List<Patient_Scans> GetPatientScans(long patientId);

        Patient_Scans Get(long id);
        Patient_Scans Create(Patient_Scans patientScans);

        void Delete(long id);
    }
}
