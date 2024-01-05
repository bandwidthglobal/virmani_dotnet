using AutoMapper;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        public readonly IStaffService _staffService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
        IWebHostEnvironment _env;
        string rootDirectory = string.Empty;
        private readonly IFileService _fileService;
        public StaffController(IStaffService staffService, IMapper mapper, IConfiguration configuration, IWebHostEnvironment env, IFileService fileService)
        {

            _staffService = staffService;
            _mapper = mapper;
            _configuration = configuration;
            _env = env;
            _fileService = fileService;
        }



        [HttpGet("GetAll")]
        public IEnumerable<Staff> GetAll()
        {
            var user = Request.HttpContext.Items["User"] as User;
            IEnumerable<Staff> staffList = _staffService.GetAll().Where(x => x.User_Id == user.Id);
            return staffList;
        }
        [HttpGet("Get/{id}")]
        public StaffDto Get(int id)
        {
            StaffDto staff = _staffService.Get(id);
            return staff;
        }

        [HttpPost("Create")]
        public IActionResult Create(StaffRequest staffRequest)
        {
            var user = (Request.HttpContext.Items["User"] as User);
            staffRequest.Role = "Staff";
            staffRequest.User_Id = user.Id;
            _ = _staffService.Create(staffRequest);
            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult Update(StaffRequest staffRequest)
        {
            _staffService.UpdateStaff(staffRequest);
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _staffService.Delete(id);
            return Ok(id);
        }
    }
}
