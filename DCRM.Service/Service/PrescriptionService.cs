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
        private readonly IRepository<MedicineBrand> _brandRepository;
        private readonly IRepository<MedicineCategory> _categoryRepository;
        public PrescriptionService(IPrescriptionRepository prescriptionRepository,
            IDrugRepository drugRepository,
            IPatientRepository patientRepository,
            IRepository<Chamber> chamberRepository, 
            IRepository<Workdone_New> workDoneRepository,
            IRepository<MedicineBrand> brandRepository,
           IRepository<MedicineCategory> categoryRepository)
        {
            _prescriptionRepository = prescriptionRepository;
            _drugRepository = drugRepository;
            _chamberRepository = chamberRepository;
            _patientRepository = patientRepository;
            _workDoneRepository = workDoneRepository;
            _brandRepository = brandRepository;
            _categoryRepository = categoryRepository;
        }

        public void Create(Prescription request)
        {
            _prescriptionRepository.Create(request);
        }

        public void Delete(long id)
        {
            _prescriptionRepository.Delete(id);
        }

        public Prescription Get(long id)
        {
            var prescription = _prescriptionRepository.Get(id);
            return prescription;
        }

        public List<PrescriptionDto> GetAll(long userId)
        {
            var prescriptions = _prescriptionRepository.GetAll().Where(x => x.User_Id == userId);
            var drugs = _drugRepository.GetAll();
            var patients = _patientRepository.GetAll();
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
            return prescriptionsList.OrderByDescending(x=>x.Id).ToList();
        }

        public List<PrescriptionDto> GetPatientPrescriptions(long patientId)
        {
            var prescriptions = _prescriptionRepository.GetAll().Where(x => x.Patient_Id == patientId);
            var drugs = _drugRepository.GetAll();
            var patients = _patientRepository.GetAll();
            List<PrescriptionDto> prescriptionsList = new List<PrescriptionDto>();
            PrescriptionDto prescriptionDto = new PrescriptionDto();
            foreach (var item in prescriptions)
            {
                prescriptionDto = new PrescriptionDto();
                prescriptionDto.Next_Duration = item.Next_Duration;
                prescriptionDto.Id = item.Id;
                prescriptionDto.Created_At = item.Created_At;
                var patient = patients.Where(x => x.Id == item.Patient_Id).FirstOrDefault();
                if (patient != null)
                {
                    prescriptionDto.Name = patient.Name;
                    prescriptionDto.Email = patient.Email;
                    prescriptionDto.Phone = patient.Mobile;
                    prescriptionDto.MrNumber = patient.Mr_Number;
                }
                prescriptionsList.Add(prescriptionDto);
            }
            return prescriptionsList;
        }

        public PrescriptionDto PrescriptionPreview(long id)
        {
            PrescriptionDto prescriptionDto = new PrescriptionDto();
            var prescriptions = _prescriptionRepository.Get(id);
            var drugs = _drugRepository.GetAll();
            var patients = _patientRepository.GetAll();
            List<PrescriptionDto> prescriptionsList = new List<PrescriptionDto>();
            if (prescriptions != null) 
            {
                prescriptionDto = new PrescriptionDto();
                prescriptionDto.Next_Duration = prescriptions.Next_Duration;
                List<DrugDto> drugList = new List<DrugDto>();
                var patientDrugIds = prescriptions.Drug_Id.Split(',');
                foreach (var did in patientDrugIds)
                {
                    DrugDto drugDto=new DrugDto();
                    var patientDrug = drugs.Where(x => x.Id == Convert.ToInt32(did)).FirstOrDefault();
                    if (patientDrug!=null)
                    {
                        drugDto.Id = patientDrug.Id;
                        drugDto.Form = patientDrug.Form;
                        drugDto.Medicine_Company = patientDrug.Medicine_Company;
                        drugDto.Dosage = patientDrug.Dosage;
                        drugDto.Details = patientDrug.Details;
                        drugDto.Description = patientDrug.Description;
                        drugDto.Basic_Salt = patientDrug.Basic_Salt;
                        drugDto.Medicine_Type = patientDrug.Medicine_Type;
                        var brand = _brandRepository.Get(Convert.ToInt64(patientDrug.Medicine_Brand_Id));
                        var category = _categoryRepository.Get(Convert.ToInt64(patientDrug.Medicine_Category_Id));
                        if (brand!=null)
                        {
                            drugDto.BrandName= brand.Medicine_Brand;
                        }
                        if (category != null)
                        {
                            drugDto.Category = category.Medicine_Category;
                        }
                    }
                    drugList.Add(drugDto);
                }
                prescriptionDto.DrugDtoList = drugList;
                var patient = patients.Where(x => x.Id == prescriptions.Patient_Id).FirstOrDefault();
                if (patient != null)
                {
                    prescriptionDto.Name = patient.Name;
                    prescriptionDto.Email = patient.Email;
                    prescriptionDto.Phone = patient.Mobile;
                    prescriptionDto.MrNumber = patient.Mr_Number;
                    prescriptionDto.Age = Convert.ToString(patient.Age);
                    prescriptionDto.Weight = Convert.ToString(patient.Weight);
                }

                prescriptionDto.User_Id = prescriptions.User_Id;
                prescriptionDto.Id = prescriptions.Id;
                prescriptionDto.Chamber_Id = prescriptions.Chamber_Id;
                prescriptionDto.Chamber = _chamberRepository.GetAll().Where(x => x.Uid == prescriptions.Chamber_Id.ToString()).FirstOrDefault();
                prescriptionDto.Check_Report = prescriptions.Check_Report;
                prescriptionDto.Created_At = prescriptions.Created_At;
                prescriptionDto.Next_Duration = prescriptions.Next_Duration;
                prescriptionDto.Next_Time = prescriptions.Next_Time;
                prescriptionDto.Check_Report = prescriptions.Check_Report;
                prescriptionDto.Created_At = prescriptions.Created_At;
            }
            return prescriptionDto;
        }

    }
}