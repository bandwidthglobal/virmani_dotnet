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
            patientScanList= _patientScansRepository.GetAll().Where(x=>x.Patient_Id==patientId && x.Status==1).OrderByDescending(x=>x.Id).ToList();
            return patientScanList;
        }

        public Patient_Scans Get(long id )
        {
            Patient_Scans patient_Scans=_patientScansRepository.Get(id);
            return patient_Scans;
        }
        public Patient_Scans Create(Patient_Scans patientScans)
        {
            patientScans.Created_At = System.DateTime.Now;
            patientScans.Updated_At = System.DateTime.Now;
            patientScans.Status=1;
            patientScans.Patient_Id = patientScans.Patient_Id;
            _patientScansRepository.Insert(patientScans);
            return patientScans;
        }
        public void Delete(long id)
        {
            var patientScan= _patientScansRepository.Get(id);
            patientScan.Status = 0;
            patientScan.Updated_At = System.DateTime.Now;
            _patientScansRepository.Update(patientScan);
        }
    }
}
