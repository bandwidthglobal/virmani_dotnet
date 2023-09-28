using AutoMapper;
using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        public readonly IDoctorService _doctorService;

        public DoctorController(IDoctorService doctorService)
        {

            _doctorService = doctorService;
        }

        

        [HttpGet("GetAll")]
        public IEnumerable<DoctorDto> GetDoctorAsync()
        {
            var user = Request.HttpContext.Items["User"] as User;
            var doctorList =  _doctorService.GetDoctorsByUserId(user.Id);
            return doctorList;
        }

        [HttpGet("Get/{id}")]
        public DoctorDto GetDoctor(int id)
        {
           
            DoctorDto doctor = _doctorService.GetDoctorByIdAsync(Convert.ToInt32(id)).Result;
            return doctor;
        }

        [HttpGet("Get/Names")]
        public List<DropdownDataDto> DoctorNameList()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return  _doctorService.NameList(user.Id);
        }
        [AllowAnonymous]
        [HttpPost("Create")]
        public IActionResult Create([FromBody] DoctorRequest request)
        {
            var user = Request.HttpContext.Items["User"] as User;
            request.User_Id = user.Id;
            request.Role = "Doctor";
            _doctorService.CreateDoctorAsync(request);
            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult Update(DoctorRequest request)
        {
            _doctorService.UpdateDoctor(request);
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public  IActionResult Delete(int id)
        {
            _doctorService.DeleteDoctor(id);
            return Ok(id.ToString());
        }
    }
}
