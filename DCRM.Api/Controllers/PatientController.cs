using AutoMapper;
using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
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

        public PatientController(IPatientService patientService)
        {

            _patientService = patientService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateRequest request)
        {

            var response = await _patientService.AuthenticateAsync(request);
            return Ok(response);
        }

        [HttpGet("GetAll")]
        public async Task<List<PatientseDto>> GetAllAsync()
        {
            List<PatientseDto> patientList = await _patientService.GetAllAsync();
            return patientList;
        }

        [HttpGet("Get/{id}")]
        public async Task<PatientseDto> GetAsync(int id)
        {

            PatientseDto patient = await _patientService.GetByIdAsync(id);
            return patient;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(PatientRequest request)
        {
           await _patientService.CreateAsync(request);
            return Ok("Updated");
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(PatientRequest request)
        {
            _patientService.Update(request);
            return Ok("Updated");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _patientService.DeleteAsync(id);
            return Ok("Deleted");
        }
    }
}
