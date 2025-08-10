using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;

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
            List<LabDataDto> labDataDtoList= new();
            var labDataList = _labDataRepository.GetAll().Where(x => x.Patient_Id == patientId && x.Is_Deleted==0).ToList();
            foreach(var item in labDataList)
            {
                LabDataDto labDataDto = new()
                {
                    Patient_Id = item.Patient_Id,
                    Arch = item.Arch,
                    Prosthesis_Type = item.Prosthesis_Type,
                    Teeth_Number = item.Teeth_Number,
                    Impression_Date = item.Impression_Date,
                    Lab_Instructions = item.Lab_Instructions,
                    Shade = item.Shade,
                    Due_Date = item.Due_Date,
                    Notes = item.Notes,
                    Send_Date = item.Send_Date,
                    Created_At = item.Created_At,
                    Laboratory_Name = item.Laboratory_Name
                };
                labDataDtoList.Add(labDataDto);
                var doctor = _doctorRepository.Get(item.Id).Name;
                if (doctor!=null)
                {
                    labDataDto.DoctorName = doctor;
                }
                var treatmentPaln = _treatmentplanRepository.Get(item.Treatment_Id);
                if (treatmentPaln!=null)
                {
                    labDataDto.TreatmentCode = treatmentPaln.Job;
                }
            }
            return labDataDtoList;
        }
    }
}
