using AutoMapper;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DCRM.Service.Service;
using DCRM.Common.Authorization;

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
        public DealerController(IDealerService dealerService, IWebHostEnvironment env, IFileService fileService)
        {
            _dealerService = dealerService;
            _env= env;
            _fileService = fileService;
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
            if (id > 0)
            {
                rootDirectory = _env.ContentRootPath;
                var filePath = FileUtils.SaveFile(id, "dealer", request.Thumb, rootDirectory);
                _fileService.UpdateFileUrl(id, filePath, "dealer");
            }
            return Ok();
        }

        [HttpPost("Update")]
        public IActionResult Update(DealerRequest request)
        {
            _dealerService.Update(request);
            if (request.Id > 0)
            {
                rootDirectory = _env.ContentRootPath;
                var filePath = FileUtils.SaveFile(request.Id, "dealer", request.Thumb, rootDirectory);
                _fileService.UpdateFileUrl(request.Id, filePath, "dealer");
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
