using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Demo_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class LabService : ILabService
    {
        public readonly IRepository<Lab_Data> _labDataRepository;
        public readonly IRepository<Doctor> _doctorRepository;
        public readonly ITreatmentplanRepository _treatmentplanRepository;
        public LabService(IRepository<Lab_Data> labDataRepository, IRepository<Doctor> doctorRepository, ITreatmentplanRepository treatmentplanRepository)
        {
            _labDataRepository=labDataRepository;
            _doctorRepository=doctorRepository;
            _treatmentplanRepository=treatmentplanRepository;
        }
        public List<LabDataDto> GetLabDataList(long patientId)
        {
            List<LabDataDto> labDataDtoList= new List<LabDataDto>();
            var labDataList = _labDataRepository.GetAll().Where(x => x.Patient_Id == patientId && x.Is_Deleted==0).ToList();
            foreach(var item in labDataList)
            {
                LabDataDto labDataDto = new LabDataDto();
                labDataDto.Patient_Id = item.Patient_Id;
                labDataDto.Arch=item.Arch;
                labDataDto.Prosthesis_Type = item.Prosthesis_Type;
                labDataDto.Teeth_Number = item.Teeth_Number;
                labDataDto.Impression_Date = item.Impression_Date;
                labDataDto.Lab_Instructions = item.Lab_Instructions;
                labDataDto.Shade = item.Shade;
                labDataDto.Due_Date = item.Due_Date;
                labDataDto.Notes = item.Notes;
                labDataDto.Send_Date = item.Send_Date;
                labDataDto.Created_At = item.Created_At;
                labDataDto.Laboratory_Name = item.Laboratory_Name;
                labDataDtoList.Add(labDataDto);
                var doctor = _doctorRepository.Get(item.Id).Name;
                if (doctor!=null)
                {
                    labDataDto.DoctorName = doctor;
                }
                var treatmentPaln = _treatmentplanRepository.GetById(item.Treatment_Id);
                if (treatmentPaln!=null)
                {
                    labDataDto.TreatmentCode = treatmentPaln.Job;
                }
            }
            return labDataDtoList;
        }
    }
}
