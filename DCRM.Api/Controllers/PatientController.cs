using AutoMapper;
using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("Patient")]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        public readonly IPatientService _patientService;
        public readonly IAppointmentService _appointmentService;
        public readonly IPrescriptionService _prescriptionService;

        public PatientController(IPatientService patientService, IAppointmentService appointmentService, IPrescriptionService prescriptionService)
        {

            _patientService = patientService;
            _appointmentService = appointmentService;
            _prescriptionService = prescriptionService;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateRequest request)
        {

            var response = await _patientService.AuthenticateAsync(request);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpGet("GetAll")]
        public async Task<List<PatientseDto>> GetAllAsync()
        {
            List<PatientseDto> patientList = await _patientService.GetAllAsync();
            return patientList;
        }

        [HttpGet("Get")]
        public async Task<PatientseDto> GetAsync()
        {
            var user = (PatientseDto)(Request.HttpContext.Items["Patient"]);
            PatientseDto patient = await _patientService.GetByIdAsync(user.Id);
            return patient;
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public IActionResult Create(PatientRequest request)
        {
           
            _patientService.CreateAsync(request);
            return Ok("Created");
        }


        [HttpPost("Update")]
        public async Task<IActionResult> Update(PatientRequest request)
        {
            var user = (PatientseDto)(Request.HttpContext.Items["Patient"]);
            request.Id = user.Id;
            _patientService.Update(request);
            return Ok("Updated");
        }

        [HttpDelete("Delete")]
        public IActionResult Delete(int id)
        {
            var user = (PatientseDto)(Request.HttpContext.Items["Patient"]);
             _patientService.DeleteAsync(user.Id);
            return Ok("Deleted");
        }

        [HttpGet("GetPrescriptions")]
        public List<PrescriptionDto> Prescriptions()
        {
            var user = (PatientseDto)(Request.HttpContext.Items["Patient"]);
            List<PrescriptionDto> prescriptionList = new List<PrescriptionDto>();
           var prescriptions = _prescriptionService.GetPrescriptions(user.Id);
            return prescriptions;
           
        }
    }
}
