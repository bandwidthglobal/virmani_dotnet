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
    [Authorize("User")]
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

        

        [HttpGet("GetAll")]
        public async Task<IEnumerable<DoctorDto>> GetDoctorAsync()
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            var doctorList =  _doctorService.GetDoctorsByUserId(user.Id);
            return doctorList;
        }

        [HttpGet("Get/{id}")]
        public DoctorDto GetDoctor(int id)
        {
           
            DoctorDto doctor = _doctorService.GetDoctorByIdAsync(Convert.ToInt32(id)).Result;
            return doctor;
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public IActionResult Create([FromBody] DoctorRequest request)
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            request.User_Id = user.Id;
            request.Role = "Doctor";
            _doctorService.CreateDoctorAsync(request);
            return Ok("created");
        }

        [HttpPost("Update")]
        public IActionResult Update(DoctorRequest request)
        {
            _doctorService.UpdateDoctor(request);
            return Ok("Updated");
        }

        [HttpDelete("Delete/{id}")]
        public  IActionResult Delete(int id)
        {
            _doctorService.DeleteDoctor(id);
            return Ok(id.ToString());
        }
    }
}
