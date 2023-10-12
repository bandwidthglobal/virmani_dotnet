using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
