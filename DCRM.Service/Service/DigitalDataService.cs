using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class DigitalDataService: IDigitalDataService
    {
        public readonly IRepository<Patient_Scans> _patientScansRepository;
        
        public DigitalDataService(IRepository<Patient_Scans> patientScansRepository) {
            _patientScansRepository=patientScansRepository;
        }

        public List<Patient_Scans> GetPatientScans(long patientId)
        {
            List<Patient_Scans> patientScanList = new List<Patient_Scans>();
            patientScanList= _patientScansRepository.GetAll().Where(x=>x.Patient_Id==patientId).ToList();
            return patientScanList;
        }
    }
}
