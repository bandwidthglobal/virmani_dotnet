using AutoMapper;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DCRM.Service.Service;
using DCRM.Common.Authorization;
using DCRM.Api.Models;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class DealerController : ControllerBase
    {
        public readonly IDealerService _dealerService;
        long userId = 0;
        IWebHostEnvironment _env;
        string rootDirectory = string.Empty;
        private readonly IFileService _fileService;
        public readonly IConfiguration _configuration;
        public DealerController(IDealerService dealerService, IWebHostEnvironment env, IFileService fileService, IConfiguration configuration)
        {
            _dealerService = dealerService;
            _env = env;
            _fileService = fileService;
            _configuration = configuration;
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<DealerDto>> GetAllAsync()
        {
            var user = Request.HttpContext.Items["User"] as User;
            if (user != null)
            {
                userId = user.Id;
            }
            var dealerList =await _dealerService.GetAllAsync(userId);
            return dealerList;
        }

        [HttpGet("Get/{id}")]
        public DealerRequest Get(int id)
        {
            var user = Request.HttpContext.Items["User"] as User;
            if (user != null)
            {
                userId = user.Id;
            }
            DealerRequest dealer = _dealerService.Get(userId, id);
            return dealer;
        }


        [HttpPost("Create")]
        public IActionResult Create(DealerRequest request)
        {
            
            var id = _dealerService.Create(request);
            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult Update(DealerRequest request)
        {
           
            if (request.Id > 0)
            {
                _dealerService.Update(request);
            }
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _dealerService.Delete(id);
            return Ok();
        }
    }
}
