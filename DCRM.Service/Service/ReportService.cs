using DCRM.Common.Dto;
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
    public class ReportService : IReportService
    {
        IDrugRepository _drugRepository;
        IRepository<Doctor> _doctorRepository;
        IRepository<Workdone_New> _workdoneRepository;
        IPrescriptionRepository _prescriptionRepository;
        IRepository<Treatmentplans> _tretmentRepository;
        IAppointmentRepository _appointmentRepository;
        IRepository<MedicineBrand> _brandRepository;
        IRepository<MedicineCategory> _categoryRepository;
        IRepository<Teethinfo> _teethInfoRepository;


        public ReportService(IDrugRepository drugRepository, IRepository<Doctor> doctorRepository,
            IRepository<Workdone_New> workdoneRepository, IRepository<Treatmentplans> tretmentRepository
            , IAppointmentRepository appointmentRepository, IPrescriptionRepository prescriptionRepository
            , IRepository<MedicineBrand> brandRepository, IRepository<MedicineCategory> categoryRepository
            , IRepository<Teethinfo> teethInfoRepository

            )
        {
            _drugRepository = drugRepository;
            _doctorRepository = doctorRepository;
            _workdoneRepository = workdoneRepository;
            _appointmentRepository = appointmentRepository;
            _tretmentRepository = tretmentRepository;
            _prescriptionRepository = prescriptionRepository;
            _brandRepository = brandRepository;
            _categoryRepository = categoryRepository;
            _teethInfoRepository = teethInfoRepository;
        }

        public PatientWorkdoneDetailsDto PatientWorkdoneDetails(long workdoneid)
        {
            PatientWorkdoneDetailsDto patientWorkdoneDetailsDto = new PatientWorkdoneDetailsDto();
            var workdoneQuery = (from w in _workdoneRepository.GetAll().ToList()
                                join d in _doctorRepository.GetAll().ToList() on w.Doctor_Id equals d.Id
                                join t in _tretmentRepository.GetAll().ToList() on w.Treatment_Id equals t.Id
                                 join te in _teethInfoRepository.GetAll().ToList() on t.Id equals te.Treatmentplans_Id
                                where w.Id == workdoneid
                                select new { DoctorName=d.Name, Job=t.Job,Date=d.Created_At.Value.ToShortDateString()
                                ,TeethNumber=te.Teeth_Number_Note,
                                ToothNote=te.Toth_Note}).FirstOrDefault();
            if ( workdoneQuery != null )
            {
                patientWorkdoneDetailsDto.DoctorName = workdoneQuery.DoctorName;
                patientWorkdoneDetailsDto.Job = workdoneQuery.Job;
                patientWorkdoneDetailsDto.Date = workdoneQuery.Date;
                patientWorkdoneDetailsDto.TeatmentName = workdoneQuery.TeethNumber;
                patientWorkdoneDetailsDto.ToothNote = workdoneQuery.ToothNote;
            }
            
            var appointments = from a in _appointmentRepository.GetAll().ToList()
                               join d in _doctorRepository.GetAll().ToList() on a.Doctor_Id equals d.Id
                               where a.Workdone_Id == workdoneid
                               select new { Date = a.Date, DoctorName = d.Name, Cause = a.Cause, Time = a.Start_Time };


            List<AppointmentDto> appointmentList = new List<AppointmentDto>();

            foreach (var item in appointments)
            {
                AppointmentDto appointment = new AppointmentDto();
                appointment.Date = item.Date;
                appointment.Doctor_Name = item.DoctorName;
                appointment.Cause = item.Cause;
                appointment.Start_Time = item.Time;
                appointmentList.Add(appointment);
            }
            var drugList = from d in _drugRepository.GetAll().ToList()
                           join mb in _brandRepository.GetAll().ToList() on d.Medicine_Brand_Id equals mb.Id.ToString()
                           join mc in _categoryRepository.GetAll().ToList() on d.Medicine_Category_Id equals mc.Id.ToString()
                           select new
                           {
                               Id=d.Id,
                               Medicine_Brand = mb.Medicine_Brand,
                               Company_Name = mb.Company_Name,
                               Form=d.Form,
                               Category=mc.Medicine_Category,
                               Details = d.Details,
                               Dosage = d.Dosage,
                               Description = d.Description,
                               Bactrology = d.Bactrology,
                               Safety_Alerts = d.Safety_Alerts,
                               Dose_No=d.Dose_No,
                               Medicine_Composition=d.Medicine_Composition,
                               Basic_Salt=mb.Basic_Salt
                           };

            List<DrugDto> drugs = new List<DrugDto>();
            if (workdoneQuery != null)
            {
                var pre = _prescriptionRepository.GetAll().Where(x=>x.Workdone_Id==workdoneid).FirstOrDefault();
               var drugIds= pre!=null? pre.Drug_Id.Split(','):new string[0];
                foreach (string drugId in drugIds)
                {
                    DrugDto? drug = new DrugDto();
                    var drugDetails = drugList.Where(x => x.Id == Convert.ToInt32(drugId)).FirstOrDefault();
                    if (drugDetails != null)
                    {
                        drug.Id = drugDetails.Id;
                        drug.Medicine_Brand = drugDetails.Medicine_Brand;
                        drug.Company_Name = drugDetails.Company_Name;
                        drug.Form = drugDetails.Form;
                        drug.Medicin_Category = drugDetails.Category;
                        drug.Details = drugDetails.Details;
                        drug.Dosage = drugDetails.Dosage;
                        drug.Description = drugDetails.Description;
                        drug.Bactrology = drugDetails.Bactrology;
                        drug.Safety_Alerts = drugDetails.Safety_Alerts;
                        drug.Dose_No = drugDetails.Dose_No;
                        drug.Medicine_Composition = drugDetails.Medicine_Composition;
                        drug.Basic_Salt = drugDetails.Basic_Salt;
                    }

                    drugs.Add(drug);

                }
            }

            patientWorkdoneDetailsDto.Drugs = drugs;
            patientWorkdoneDetailsDto.Appointments = appointmentList;
            return patientWorkdoneDetailsDto;
        }
    }
}
