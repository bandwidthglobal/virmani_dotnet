using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize]
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
            var user = Request.HttpContext.Items["User"] as User;
            return _chairService.GetAll().Where(x=>x.User_Id== user.Id).ToList();
        }
        [HttpGet("GetChairsForDropdown")]
        public List<ChairDto> GetChairsForDropdown()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return _chairService.GetChairsForDropdown(user.Id);
        }
        [HttpGet("Get/{id}")]   
        public Chair Get(int id)
        {
            return _chairService.Get(id);
        }

        [HttpPost("Create")]
        public IActionResult Create(Chair chair)
        {
            var user = Request.HttpContext.Items["User"] as User;
            chair.User_Id = user.Id;
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
            _chairService.Delete(id);
            return Ok(id);
        }
    }
}
