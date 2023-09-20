using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;
using System.Numerics;

namespace DCRM.Service.Service
{
    public class PrescriptionService : IPrescriptionService
    {
        public readonly IPrescriptionRepository _prescriptionRepository;
        public readonly IDrugRepository _drugRepository;
        private readonly IRepository<Chamber> _chamberRepository;
        private readonly IRepository<Workdone_New> _workDoneRepository;
        private readonly IPatientRepository _patientRepository;
        public PrescriptionService(IPrescriptionRepository prescriptionRepository, 
            IDrugRepository drugRepository, 
            IPatientRepository patientRepository, 
            IRepository<Chamber> chamberRepository, IRepository<Workdone_New> workDoneRepository)
        {
            _prescriptionRepository = prescriptionRepository;
            _drugRepository = drugRepository;
            _chamberRepository = chamberRepository;
            _patientRepository = patientRepository;
            _workDoneRepository= workDoneRepository;
        }

        public async Task CreateAsync(Prescription request)
        {
            await _prescriptionRepository.CreateAsync(request);
        }

        public async Task DeleteAsync(int id)
        {
            await _prescriptionRepository.DeleteAsync(id);
        }

        public async Task<Prescription> GetByIdAsync(int id)
        {
            var prescription = await _prescriptionRepository.GetByIdAsync(id);
            return prescription;
        }

        public List<PrescriptionDto> GetByUserId(int userId)
        {
            var prescriptions = _prescriptionRepository.GetAll().Where(x => x.User_Id == userId );
            var drugs = _drugRepository.GetAllAsync().Result;
            var patients = _patientRepository.GetAllAsync().Result;
            List<PrescriptionDto> prescriptionsList = new List<PrescriptionDto>();
            PrescriptionDto prescriptionDto = new PrescriptionDto();
            foreach (var item in prescriptions)
            {
                prescriptionDto = new PrescriptionDto();
                prescriptionDto.Next_Duration = item.Next_Duration;
                List<Drug> drugList = new List<Drug>();
                var patientDrugIds = item.Drug_Id.Split(',');
                foreach (var did in patientDrugIds)
                {
                    var patientDrug = drugs.Where(x => x.Id == Convert.ToInt32(did)).FirstOrDefault();
                    drugList.Add(patientDrug);
                }
                prescriptionDto.Drugs = drugList;
                var patient = patients.Where(x => x.Id == item.Patient_Id).FirstOrDefault();
                if (patient != null)
                {
                    prescriptionDto.Name = patient.Name;
                    prescriptionDto.Email = patient.Email;
                    prescriptionDto.Phone = patient.Mobile;
                    prescriptionDto.MrNumber = patient.Mr_Number;
                }

                prescriptionDto.User_Id = item.User_Id;
                prescriptionDto.Id = item.Id;
                prescriptionDto.Chamber_Id = item.Chamber_Id;
                prescriptionDto.Chamber = _chamberRepository.GetAll().Where(x => x.Uid == item.Chamber_Id.ToString()).FirstOrDefault();
                prescriptionDto.Check_Report = item.Check_Report;
                prescriptionDto.Created_At = item.Created_At;
                prescriptionDto.Next_Duration = item.Next_Duration;
                prescriptionDto.Next_Time = item.Next_Time;
                prescriptionDto.Check_Report = item.Check_Report;
                prescriptionsList.Add(prescriptionDto);
            }
            return prescriptionsList;
            //var prescriptions = _prescriptionRepository.GetByUserId(userId);
            //return prescriptions;
        }

        public List<PrescriptionDto> GetPrescriptions(int userId, int patientId)
        {
            var prescriptions = _prescriptionRepository.GetAll().Where(x => x.User_Id == userId && x.Patient_Id == patientId);
            var drugs = _drugRepository.GetAllAsync().Result;
            var patients = _patientRepository.GetAllAsync().Result;
            List<PrescriptionDto> prescriptionsList = new List<PrescriptionDto>();
            PrescriptionDto prescriptionDto = new PrescriptionDto();
            foreach (var item in prescriptions)
            {
                prescriptionDto = new PrescriptionDto();
                prescriptionDto.Next_Duration = item.Next_Duration;
                List<Drug> drugList = new List<Drug>();
                var patientDrugIds = item.Drug_Id.Split(',');
                foreach (var did in patientDrugIds)
                {
                    var patientDrug = drugs.Where(x => x.Id == Convert.ToInt32(did)).FirstOrDefault();
                    drugList.Add(patientDrug);
                }
                prescriptionDto.Drugs = drugList;
                var patient = patients.Where(x => x.Id == item.Patient_Id).FirstOrDefault();
                if (patient != null)
                {
                    prescriptionDto.Name = patient.Name;
                    prescriptionDto.Email = patient.Email;
                    prescriptionDto.Phone = patient.Mobile;
                    prescriptionDto.MrNumber = patient.Mr_Number;
                }

                prescriptionDto.User_Id = item.User_Id;
                prescriptionDto.Id = item.Id;
                prescriptionDto.Chamber_Id = item.Chamber_Id;
                prescriptionDto.Chamber = _chamberRepository.GetAll().Where(x => x.Uid == item.Chamber_Id.ToString()).FirstOrDefault();
                prescriptionDto.Check_Report = item.Check_Report;
                prescriptionDto.Created_At = item.Created_At;
                prescriptionDto.Next_Duration = item.Next_Duration;
                prescriptionDto.Next_Time = item.Next_Time;
                prescriptionDto.Check_Report = item.Check_Report;
                prescriptionsList.Add(prescriptionDto);
            }
            return prescriptionsList;
        }

        public List<PrescriptionDto> GetPrescriptions(int patientId)
        {
            var prescriptions = _prescriptionRepository.GetAll().Where(x => x.Patient_Id == patientId);
            var drugs = _drugRepository.GetAllAsync().Result;
            var patients = _patientRepository.GetAllAsync().Result;
            List<PrescriptionDto> prescriptionsList = new List<PrescriptionDto>();
            PrescriptionDto prescriptionDto = new PrescriptionDto();
            foreach (var item in prescriptions)
            {
                prescriptionDto = new PrescriptionDto();
                prescriptionDto.Next_Duration = item.Next_Duration;
                List<Drug> drugList = new List<Drug>();
                var patientDrugIds = item.Drug_Id.Split(',');
                foreach (var did in patientDrugIds)
                {
                    var patientDrug = drugs.Where(x => x.Id == Convert.ToInt32(did)).FirstOrDefault();
                    drugList.Add(patientDrug);
                }
                prescriptionDto.Drugs = drugList;
                var patient = patients.Where(x => x.Id == item.Patient_Id).FirstOrDefault();
                if (patient != null)
                {
                    prescriptionDto.Name = patient.Name;
                    prescriptionDto.Email = patient.Email;
                    prescriptionDto.Phone = patient.Mobile;
                    prescriptionDto.MrNumber = patient.Mr_Number;
                }

                prescriptionDto.User_Id = item.User_Id;
                prescriptionDto.Id = item.Id;
                prescriptionDto.Chamber_Id = item.Chamber_Id;
                prescriptionDto.Chamber = _chamberRepository.GetAll().Where(x => x.Uid == item.Chamber_Id.ToString()).FirstOrDefault();
                prescriptionDto.Check_Report = item.Check_Report;
                prescriptionDto.Created_At = item.Created_At;
                prescriptionDto.Next_Duration = item.Next_Duration;
                prescriptionDto.Next_Time = item.Next_Time;
                prescriptionDto.Check_Report = item.Check_Report;
                prescriptionsList.Add(prescriptionDto);
            }
            return prescriptionsList;
        }

       

    }
}