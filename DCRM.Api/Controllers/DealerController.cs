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

        public DealerController(IDealerService dealerService)
        {

            _dealerService = dealerService;
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<DealerDto>> GetAllAsync()
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            if (user != null)
            {
                userId = user.Id;
            }
            var dealerList =await _dealerService.GetAllAsync(userId);
            return dealerList;
        }

        [HttpGet("Get/{id}")]
        public async Task<DealerDto> GetAsync(int id)
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            if (user != null)
            {
                userId = user.Id;
            }
            DealerDto dealer = await _dealerService.GetByIdAsync(userId, id);
            return dealer;
        }


        [HttpPost("Create")]
        public async Task<IActionResult> Create(DealerRequest request)
        {
            await _dealerService.CreateAsync(request);
            return Ok("Created");
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(DealerRequest request)
        {
            _dealerService.Update(request);
            return Ok("Updated");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(long userId, int id)
        {
            await _dealerService.DeleteAsync(userId, id);
            return Ok("Deleted");
        }
    }
}
