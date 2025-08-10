using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;

namespace DCRM.Service.IService
{
    public interface IAppointmentService
    {
        IEnumerable<Appointment> GetAll(long userId,string role);

        Appointment Get(long id);

        List<AppointmentDto> GetByPatientId(int patientId);

        long Create(AppointmentRequest request);

        void Update(Appointment request);

        void Delete(long id);

        List<AppointmentDto> GetAppointmentWithPatient(long userId);
        List<Assaign_Day> GetDays(long userId);
        List<Assign_Time> GetTimes(long userId);
        void UpdateTimes(long userId, List<Assign_Time> assignTimes);
        void DeleteTime(int id);

        AppointmentChairViewDto AppointmentChairViewSearch(AppointmentChairViewSearchParameters parameters);

        List<AppointmentDto> GetWaitingRoom(long userId);

        void ChangeAppointmentStatus(long id, int status);

        void SetSchedule(ScheduleTimeRequest scheduleTime);

        AppointmentDto GetAppointmentDetails(long id);
    }
}
