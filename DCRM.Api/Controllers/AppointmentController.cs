using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        public readonly IAppointmentService _appointmentService;
        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }
        [HttpGet("GetAll")]
        public IEnumerable<Appointment> GetAll()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return _appointmentService.GetAll(user.Id, user.Role);
        }
        [HttpGet("GetAppointmentWithPatient")]
        public List<AppointmentDto> GetAppointmentWithPatient() {
            var user = Request.HttpContext.Items["User"] as User;
           var appointments = _appointmentService.GetAppointmentWithPatient(user.Id).OrderByDescending(x=>x.Date).ToList();
            return appointments;
        }

        [HttpGet("GetAppointmentCalendar")]
        public List<Calendar> GetAppointmentCalendar()
        {
            var user = Request.HttpContext.Items["User"] as User;
            var appointments = _appointmentService.GetAppointmentWithPatient(user.Id).OrderByDescending(x => x.Date).ToList();
            List<Calendar> calendarList=new();
            foreach (var appointment in appointments)
            {
                Calendar calendar = new()
                {
                    Id = appointment.Id,
                    Start = Convert.ToDateTime(appointment.Date.ToString().Split(" ")[0] + " " + appointment.Start_Time).ToString(),
                    End = Convert.ToDateTime(appointment.Date.ToString().Split(" ")[0] + " " + appointment.End_Time).ToString(),
                    Title = appointment.Patient_Name + "/" + appointment.Doctor_Name
                };
                calendarList.Add(calendar);

            }
            return calendarList;
        }

        [HttpGet("Get/{id}")]
        public Appointment Get(int id)
        {
            return  _appointmentService.Get(id);
        }
        [HttpGet("GetAppointmentDetails/{id}")]
        public AppointmentDto GetAppointmentDetails(long id)
        {
            var appointMent= _appointmentService.GetAppointmentDetails(id);
            return appointMent;
        }
        

        [HttpPost("ChairViewsSearch")]
        public AppointmentChairViewDto ChairViewsSearch(AppointmentChairViewSearchParameters parameters)
        {
            var user = Request.HttpContext.Items["User"] as User;
            parameters.UserId = user.Id;
            return _appointmentService.AppointmentChairViewSearch(parameters);
        }


        [HttpPost("Create")]
        public IActionResult Create(AppointmentRequest appointment)
        {
          long appointmentId=_appointmentService.Create(appointment);
            return Ok(appointmentId);

        }

        [HttpPost("Update")]
        public IActionResult Update(Appointment appointment)
        {
            _appointmentService.Update(appointment);
            return Ok(appointment);

        }


        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _appointmentService.Delete(id);
                return Ok(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }


        [HttpGet("GetTimes")]
        public List<Assign_Time> GetAllTime()
        {
            var user = Request.HttpContext.Items["User"] as User;
            _ = new List<Assign_Time>();
            List<Assign_Time> times = _appointmentService.GetTimes(user.Id);
            return times;
        }

        [HttpGet("UpdateTimes")]
        public IActionResult UpdateTimes(List<Assign_Time> assignTimes)
        {
            var user = Request.HttpContext.Items["User"] as User;
            _appointmentService.UpdateTimes(user.Id,assignTimes);
            return Ok();
        }

        [HttpDelete("DeleteTime/{id}")]
        public IActionResult DeleteTimes(int id)
        {
            _ = Request.HttpContext.Items["User"] as User;
            _appointmentService.DeleteTime(id);
            return Ok();
        }

        [HttpGet("GetWettingRoom")]
        public List<AppointmentDto> GetWettingRoom()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return _appointmentService.GetWaitingRoom(user.Id);
        }

        [HttpGet("ChangeAppointmentStatus/{id}/{status}")]
        public IActionResult ChangeAppointmentStatus(long id, int status)
        {
            _appointmentService.ChangeAppointmentStatus(id, status);
            return Ok();
        }

        [HttpPost("SetSchedule")]
        public IActionResult SetSchedule(ScheduleTimeRequest secheduleTime)
        {
            var user = Request.HttpContext.Items["User"] as User;

            secheduleTime.User_Id = user.Id;
            _appointmentService.SetSchedule(secheduleTime);
            return Ok();
        }
    }
}
