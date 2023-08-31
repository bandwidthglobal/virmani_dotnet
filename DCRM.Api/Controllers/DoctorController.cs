using AutoMapper;
using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("Doctor")]
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        public readonly IDoctorService _doctorService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public DoctorController(IDoctorService doctorService, IMapper mapper, IConfiguration configuration)
        {

            _doctorService = doctorService;
            _mapper = mapper;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateRequest request)
        {

            var response = await _doctorService.AuthenticateAsync(request);
            return Ok(response);
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<DoctorDto>> GetStaffsAsync()
        {

            var doctorList = await _doctorService.GetDoctorsAsync();
            return doctorList;
        }

        [HttpGet("Get/{id}")]
        public async Task<DoctorDto> GetStaffAsync(int id)
        {

            DoctorDto doctor = await _doctorService.GetDoctorByIdAsync(id);
            return doctor;
        }
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] DoctorRequest request)
        {
            await _doctorService.CreateDoctorAsync(request);
            return Ok("created");
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(DoctorRequest request)
        {
            _doctorService.UpdateDoctor(request);
            return Ok("Updated");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           await _doctorService.DeleteDoctorAsync(id);
            return Ok("Deleted");
        }
    }
}
