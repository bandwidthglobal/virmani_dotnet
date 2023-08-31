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
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] AuthenticateRequest request)
        {

            var response = await _staffService.AuthenticateAsync(request);
            //var cookieOptions = new CookieOptions
            //{
            //    HttpOnly = true,
            //    Expires = DateTime.UtcNow.AddDays(7)
            //};
            //Response.Cookies.Append("refreshToken", response.RefreshToken, cookieOptions);
            return Ok(response);
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<StaffDto>> GetStaffsAsync()
        {

            List<StaffDto> staffList = _mapper.Map<List<StaffDto>>(await _staffService.GetStaffsAsync());
            return staffList;
        }

        [HttpGet("Get/{id}")]
        public async Task<StaffDto> GetStaffAsync(int id)
        {

            StaffDto staff = await _staffService.GetStaffByIdAsync(id);
            return staff;
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(StaffRequest staffRequest)
        {
            _staffService.UpdateStaff(staffRequest);
            return Ok("Updated");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           await _staffService.DeleteStaffAsync(id);
            return Ok("Deleted");
        }
    }
}
