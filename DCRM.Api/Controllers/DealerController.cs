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
        

        public DealerController(IDealerService dealerService)
        {

            _dealerService = dealerService;
        }

       

        [HttpGet("GetAll")]
        public async Task<IEnumerable<DealerDto>> GetAllAsync()
        {

            var dealerList =await _dealerService.GetAllAsync();
            return dealerList;
        }

        [HttpGet("Get/{id}")]
        public async Task<DealerDto> GetAsync(int id)
        {

            DealerDto dealer = await _dealerService.GetByIdAsync(id);
            return dealer;
        }

        [HttpGet("GetByUserId/{userId}")]
        public async Task<IEnumerable<DealerDto>> GetByUserIdAsync(int userId)
        {

            var dealerList = await _dealerService.GetByUserId(userId);
            return dealerList;
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
        public async Task<IActionResult> Delete(int id)
        {
            await _dealerService.DeleteAsync(id);
            return Ok("Deleted");
        }
    }
}
