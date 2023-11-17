using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public string ToothNote { get; set; }
    }
}
