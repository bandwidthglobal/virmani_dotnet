using DCRM.Common.Entity;

namespace DCRM.Common.Dto
{
    public class AppointmentChairViewDto
    {
        public long Id { get; set; }
        public string? DoctorName { get; set; }
        public string? SlotTime { get; set; }
        public string? Date { get; set; }
        public Chair? Chair { get; set; }
        public List<Chair>? ChairList { get; set; }
        public List<DropdownDataDto>? DoctorList { get; set; }
        public List<string>? ScheduleTimeList { get; set; }
        public long DoctorId { get; set; }
        public AppointmentDto? Appointment { get; set; }
        public List<AppointmentScheduleTime>? AppointmentScheduleTimes { get; set; }

    }

    public class AppointmentChair
    {
        public int Id { get; set; }

        public string? Uid { get; set; }

        public int User_Id { get; set; }

        public string? Name { get; set; }

        public string? Address { get; set; }

        public long Doctor_Id { get; set; }

        public int? Appoinment_Limit { get; set; }

        public int Status { get; set; }

        public int? Is_Primary { get; set; }

        public DateTime? Created_At { get; set; }

        public AppointmentDto? AppointmentDetails { get; set; }

    }
    public class AppointmentScheduleTime
    {
        public string? SlatTime { get; set; }
        public List<AppointmentChair>? ChairList { get; set; }

    }

    public class AppointmentChairViewSearchParameters
    {
        public long UserId { get; set; }
        public string? DoctorIds { get; set; }
        public string? ChairIds { get; set; }
        public string? ScheduleDate { get; set; }

    }
}
