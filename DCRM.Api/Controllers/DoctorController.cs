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
        [HttpPost("Authenticate")]
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

        [HttpGet("Get")]
        public DoctorDto GetDoctor()
        {
            var user = (DoctorDto)(Request.HttpContext.Items["Doctor"]);
            DoctorDto doctor = _doctorService.GetDoctorByIdAsync(Convert.ToInt32(user.Id)).Result;
            return doctor;
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public IActionResult Create([FromBody] DoctorRequest request)
        {
            request.Role = "Doctor";
            _doctorService.CreateDoctorAsync(request);
            return Ok("created");
        }

        [HttpPost("Update")]
        public IActionResult Update(DoctorRequest request)
        {
            var user = (DoctorDto)(Request.HttpContext.Items["Doctor"]);
            request.Id = user.Id;
            _doctorService.UpdateDoctor(request);
            return Ok("Updated");
        }

        [HttpDelete("Delete")]
        public  IActionResult Delete()
        {
            var user = (DoctorDto)(Request.HttpContext.Items["Doctor"]);
            Int32 id = Convert.ToInt32(user.Id);
             _doctorService.DeleteDoctorAsync(id);
            return Ok("Deleted");
        }
    }
}
