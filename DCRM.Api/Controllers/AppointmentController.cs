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
        public readonly IAppointmentService _appointmentfService;
        public AppointmentController(IAppointmentService appointmentfService)
        {
            _appointmentfService = appointmentfService;
        }
        [HttpGet("GetAll")]
        public async Task<IEnumerable<Appointment>> GetAllAsync()
        {
            return await _appointmentfService.GetAllAsync();
        }

        [HttpGet("Get/{id}")]
        public async Task<Appointment> Get(int id)
        {
            return await _appointmentfService.GetByIdAsync(id);
        }
        [HttpGet("GetByUser")]
        public async Task<IEnumerable<Appointment>> GetByUser()
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            return await _appointmentfService.GetByUserId(user.Id);
        }

        [HttpGet("GetWithPatientByUser")]
        public List<AppointmentDto> GetWithPatientByUser()
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            return _appointmentfService.GetAppointMentWithPatientByUserId(user.Id);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(Appointment appointment)
        {
            await _appointmentfService.CreateAsync(appointment);
            return Ok(appointment);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(Appointment appointment)
        {
            _appointmentfService.Update(appointment);
            return Ok(appointment);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _appointmentfService.DeleteAsync(id);
            return Ok(id);
        }

        [HttpGet("GetAppointments/{patientId}")]
        public List<AppointmentDto> GetAppointmentsByPatient(int patientId)
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            List<AppointmentDto> appointments = _appointmentfService.GetByPatientId(user.Id, patientId);
            return appointments;
        }
    }
}
