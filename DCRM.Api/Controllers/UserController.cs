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
        private readonly IFileService _fileService;
        private readonly IExperienceService _experienceService;
        IWebHostEnvironment _env;
        string rootDirectory = string.Empty;
        public UserController(IUserService userService, IFileService fileService, IWebHostEnvironment env, IExperienceService experienceService)
        {

            _userService = userService;
            _fileService = fileService;
            _env = env;
            _experienceService = experienceService;
        }


        [HttpGet("Get/{id}")]
        public User Get(long id)
        {
            var user =  _userService.Get(id);
         
            if (user!=null)
            {
                return user;
            }
            else
            {
                throw new KeyNotFoundException("No record found");
            }
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public IActionResult Create(UserRequest userRequestModel)
        {
            _userService.Create(userRequestModel);
            return  Ok();
        }
       
        [HttpPost("Update")]
        public IActionResult Update(UserUpdateRequest userUpdateRequestModel)
        {
            
                 _userService.Update(userUpdateRequestModel);
                return Ok();
               
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(long id)
        {
            _userService.Delete(id);
            return Ok();
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordRequest model)
        {
            await _userService.ChangeUserPasswordAsync(model);
            return Ok(model);
        }

        [HttpPost("Update/Image/{id}")]
        public string UpdateImage([FromBody] string thumb,long id)
        {
            string filePath=string.Empty;
            if (id > 0)
            {
                rootDirectory = _env.ContentRootPath;
                filePath = FileUtils.SaveFile(id, "user", thumb, rootDirectory);
                _fileService.UpdateFileUrl(id, filePath, "user");
            }
            return filePath;
        }

        [HttpGet("Experience/GetAll/{userId}")]
        public IEnumerable<Experience> GetAllExperience(long userId)
        {
            var experiences = _experienceService.GetAll(userId);
            if (experiences != null)
            {
                return experiences;
            }
            else
            {
                throw new KeyNotFoundException("No record found");
            }
        }
        [HttpGet("Experience/Get/{id}")]
        public Experience GetExperience(long id)
        {
            var experience = _experienceService.Get(id);
            if (experience != null)
            {
                return experience;
            }
            else
            {
                throw new KeyNotFoundException("No record found");
            }
        }
        [HttpPost("Experience/Create")]
        public IActionResult ExperienceCreate(Experience experience)
        {
            _experienceService.Create(experience);
            return Ok();
        }

        [HttpPost("Experience/Update")]
        public IActionResult ExperienceUpdate(Experience experience)
        {
            _experienceService.Update(experience);
            return Ok();

        }

        [HttpDelete("Experience/Delete/{id}")]
        public IActionResult ExperienceDelete(long id)
        {
            _experienceService.Delete(id);
            return Ok();
        }
    }
}
