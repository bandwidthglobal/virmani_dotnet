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
        public IEnumerable<DoctorDto> GetAll()
        {
            var user = Request.HttpContext.Items["User"] as User;
            var doctorList =  _doctorService.GetDoctorsByUserId(user.Id);
            return doctorList;
        }

        [HttpGet("Get/{id}")]
        public DoctorDto Get(long id)
        {
           
            DoctorDto doctor = _doctorService.Get(Convert.ToInt64(id));
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
            _doctorService.Create(request);
            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult Update(DoctorRequest request)
        {
            _doctorService.Update(request);
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public  IActionResult Delete(long id)
        {
            _doctorService.Delete(id);
            return Ok(id.ToString());
        }
    }
}
