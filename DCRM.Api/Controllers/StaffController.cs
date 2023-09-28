using AutoMapper;
using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
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

        

        [HttpGet("GetAll")]
        public async Task<IEnumerable<Staff>> GetStaffListAsync()
        {
            var user = Request.HttpContext.Items["User"] as User;
            IEnumerable<Staff> staffList =  _staffService.GetStaffsAsync().Result.Where(x => x.User_Id == user.Id);
            return staffList;
        }
        [HttpGet("Get/{id}")]
        public async Task<StaffDto> GetStaffAsync(int id)
        {
            StaffDto staff = await _staffService.GetStaffByIdAsync(id);
            return staff;
        }

        [HttpPost("Create")]
        public IActionResult Create(StaffRequest staffRequest)
        {
            var user = (Request.HttpContext.Items["User"] as User);
            staffRequest.Role = "Staff";
            staffRequest.User_Id = user.Id;
            _staffService.CreateStaffByUserAsync(staffRequest);
            return Ok("Created");
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
            return Ok(id);
        }
    }
}
