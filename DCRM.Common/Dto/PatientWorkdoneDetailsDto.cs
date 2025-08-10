using DCRM.Common.Entity;

namespace DCRM.Common.Dto
{
    public class PatientWorkdoneDetailsDto
    {
        public string? DoctorName { get; set; }
        public string? Date { get; set; }
        public string? PatientName { get; set; }
        public string? TeatmentName { get; set; }
        public string? Job { get; set; }
        public Prescription? Prescription { get; set; }
        public List<DrugDto>? Drugs { get; set; }
        public List<AppointmentDto>? Appointments { get; set; }
        public string? ToothNote { get; set; }
    }
}
