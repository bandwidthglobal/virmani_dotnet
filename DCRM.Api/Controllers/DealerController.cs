using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Mvc;
using DCRM.Common.Authorization;

namespace DCRM.Api.Controllers
{
    [Authorize]
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
        public IEnumerable<DealerDto> GetAll()
        {
            if (Request.HttpContext.Items["User"] is User user)
            {
                userId = user.Id;
            }
            var dealerList =_dealerService.GetAll(userId);
            return dealerList;
        }

        [HttpGet("Get/{id}")]
        public DealerRequest Get(int id)
        {
            if (Request.HttpContext.Items["User"] is User user)
            {
                userId = user.Id;
            }
            DealerRequest dealer = _dealerService.Get(id);
            return dealer;
        }


        [HttpPost("Create")]
        public IActionResult Create(DealerRequest request)
        {
            _ = _dealerService.Create(request);
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
