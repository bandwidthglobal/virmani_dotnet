using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Dto
{
    public class DashboardDto
    {
        public int PatientCount { get; set; }
        public int AppointmentCount { get; set; }
        public int TodayAppointmentCount { get; set; }
        public int StaffCount { get; set; }
    }
}
