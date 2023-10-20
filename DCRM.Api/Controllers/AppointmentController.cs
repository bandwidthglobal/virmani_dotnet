using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
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

        [HttpGet("Get/{id}")]
        public Appointment Get(int id)
        {
            return  _appointmentService.Get(id);
        }

        [HttpGet("ChairViews")]
        public List<AppointmentChairViewDto> ChairViews()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return _appointmentService.AppointmentChairViewList(user.Id);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(Appointment appointment)
        {
            try
            {
                _appointmentService.Create(appointment);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
           
        }

        [HttpPost("Update")]
        public IActionResult Update(Appointment appointment)
        {
            try
            {
                _appointmentService.Update(appointment);
                return Ok(appointment);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
          
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
            List<Assign_Time> times= new List<Assign_Time>();
            times = _appointmentService.GetTimes(user.Id);
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
            var user = Request.HttpContext.Items["User"] as User;
            _appointmentService.DeleteTime(id);
            return Ok();
        }
    }
}
