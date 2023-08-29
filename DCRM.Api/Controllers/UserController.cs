using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Mvc;
using DCRM.Api.Models;
using DCRM.Service.IService;
using AutoMapper;
using System;
using DCRM.Service;
using DCRM.Common.Request;
using Newtonsoft.Json.Linq;
using DCRM.Common.RequestModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserService _userService;
        public readonly IStaffService _staffService;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IMapper mapper, IConfiguration configuration, IStaffService staffService)
        {

            _userService = userService;
            _mapper = mapper;
            _configuration = configuration;
            _staffService = staffService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody]AuthenticateRequest request)
        {
            
            var response = await _userService.AuthenticateAsync(request);
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", response.RefreshToken, cookieOptions);
            return Ok(response);
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
           
            List<UserDto> userList = _mapper.Map<List<UserDto>>(await _userService.GetUsersAsync());
            return userList;
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user!=null)
            {
                UserDto userDetails = _mapper.Map<UserDto>(user);
                return Ok(userDetails);
            }
            else
            {
                throw new KeyNotFoundException("No record found");
            }
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] UserRequest userRequestModel)
        {
            await _userService.SaveUserAsync(userRequestModel);
            return  Ok("created");
        }
       
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UserUpdateRequest userUpdateRequestModel)
        {
            
                await _userService.UpdateUserAsync(userUpdateRequestModel);
                return Ok("updated");
               
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok("deleted");
        }

        [HttpDelete("ChangePassword")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordRequest model)
        {
            await _userService.ChangeUserPasswordAsync(model);
            return Ok("changed");
        }


        [HttpPost("CreateStaff")]
        public async Task<IActionResult> CreateStaff([FromBody] StaffRequest staffRequest)
        {
            await _staffService.CreateStaffByUserAsync(staffRequest);
            return Ok("created");
        }

        [HttpPost("GetStaffByUser/{userId}")]
        public  IActionResult GetStaffByUser(int userId)
        {
          var staffList=  _staffService.GetStaffsByUserId(userId);
            return Ok(staffList);
        }
    }
}
