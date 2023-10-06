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
            long id = _staffService.Create(staffRequest);
            if (id > 0)
            {
                rootDirectory = _env.ContentRootPath;
                var filePath = FileUtils.SaveFile(id, "staff", staffRequest.Thumb, rootDirectory);
                _fileService.UpdateFileUrl(id, filePath, "staff");
            }
            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult Update(StaffRequest staffRequest)
        {
            _staffService.UpdateStaff(staffRequest);
            if (staffRequest.Id > 0)
            {
                rootDirectory = _env.ContentRootPath;
                var filePath = FileUtils.SaveFile(staffRequest.Id, "staff", staffRequest.Thumb, rootDirectory);
                _fileService.UpdateFileUrl(staffRequest.Id, filePath, "staff");
            }
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
