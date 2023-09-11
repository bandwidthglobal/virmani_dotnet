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
    [Authorize("Staff")]
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        public readonly IStaffService _staffService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public StaffController(IStaffService staffService, IMapper mapper, IConfiguration configuration)
        {

            _staffService = staffService;
            _mapper = mapper;
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateRequest request)
        {

            var response = await _staffService.AuthenticateAsync(request);
            return Ok(response);
        }

        [HttpGet("Get")]
        public async Task<StaffDto> GetStaffAsync()
        {
            var user = (StaffDto)(Request.HttpContext.Items["Staff"]);
            StaffDto staff = await _staffService.GetStaffByIdAsync(user.Id);
            return staff;
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public IActionResult Create(StaffRequest staffRequest)
        {
            staffRequest.Role = "Staff";
            _staffService.CreateStaffByUserAsync(staffRequest);
            return Ok("Created");
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(StaffRequest staffRequest)
        {
            var user = (StaffDto)(Request.HttpContext.Items["User"]);
            staffRequest.Id = user.Id;
            _staffService.UpdateStaff(staffRequest);
            return Ok("Updated");
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = (StaffDto)(Request.HttpContext.Items["User"]);
            await _staffService.DeleteStaffAsync(user.Id);
            return Ok("Deleted");
        }
    }
}
