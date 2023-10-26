using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class ChairController : ControllerBase
    {
        private readonly IChairService _chairService;
        public ChairController(IChairService chairService) {
            _chairService= chairService;
        }

        [HttpGet("GetAll")]
        public List<ChairDto> GetAll()
        {
            return _chairService.GetAll();
        }

        [HttpGet("Get/{id}")]   
        public Chair Get(int id)
        {
            return _chairService.Get(id);
        }

        [HttpPost("Create")]
        public IActionResult Create(Chair chair)
        {
             _chairService.Create(chair);
            return Ok(chair);
        }

        [HttpPost("Update")]
        public IActionResult Update(Chair chair)
        {
            _chairService.Update(chair);
            return Ok(chair);
        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            _chairService.delete(id);
            return Ok(id);
        }
    }
}
