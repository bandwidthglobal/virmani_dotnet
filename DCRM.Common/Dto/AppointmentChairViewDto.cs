using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Dto
{
    public class AppointmentChairViewDto
    {
        public long Id { get; set; }
        public string? DoctorName { get; set; }
        public string? SlotTime { get; set; }
        public string? Date { get; set; }
        public Chair? Chair { get; set; }

        public long DoctorId { get; set; }

    }
}
