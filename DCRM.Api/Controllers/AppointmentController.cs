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
        public async Task<IEnumerable<Appointment>> GetAllAsync()
        {
            return await _appointmentService.GetAllAsync();
        }

        [HttpGet("Get/{id}")]
        public async Task<Appointment> Get(int id)
        {
            return await _appointmentService.GetByIdAsync(id);
        }
        [HttpGet("Get/User")]
        public IEnumerable<AppointmentDto> GetAppointment()
        {
            try
            {
                var user = Request.HttpContext.Items["User"] as User;
                return _appointmentService.GetAppointMentWithPatientByUserId(user.Id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        [HttpGet("Get/Patient/{patientId}")]
        public List<AppointmentDto> GetPatientAppointment(int patientId)
        {
            try
            {
                return _appointmentService.GetByPatientId(patientId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(Appointment appointment)
        {
            try
            {
                await _appointmentService.CreateAsync(appointment);
                return Ok(appointment);
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
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _appointmentService.DeleteAsync(id);
                return Ok(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }
    }
}
