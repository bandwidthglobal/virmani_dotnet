using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Dto
{
    public class AppointmentDto
    {
        public int Id { get; set; }

        public int Chamber_Id { get; set; }

        public int User_Id { get; set; }

        public int Patient_Id { get; set; }

        public long Doctor_Id { get; set; }

        public string? Doctor_Name { get; set; }

        public string? Chair { get; set; }

        public string? Number_Of_Slot { get; set; }

        public string? Slot_Time { get; set; }

        public string? Cause { get; set; }

        public string? Extra_Notes { get; set; }

        public int? Prescription_Id { get; set; }

        public DateTime Date { get; set; }

        public TimeSpan Start_Time { get; set; }

        public TimeSpan End_Time { get; set; }

        public string? Meeting_Notes { get; set; }

        public string? Files { get; set; }

        public string? Type { get; set; }

        public int Serial_Id { get; set; }

        public int Status { get; set; }

        public int Appointment_Status { get; set; }

        public int? Is_Start { get; set; }

        public sbyte Is_Delete { get; set; }

        public DateTime Created_At { get; set; }

        public Patientse?  Patient { get; set; }

        
    }
}
