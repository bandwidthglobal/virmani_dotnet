using DCRM.Common.Authorization;
using DCRM.Common.Entity;
using DCRM.Service.IService;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/User/[controller]")]
    [ApiController]
    public class DrugController : ControllerBase
    {
        public readonly IDurgService _drugfService;
        int _userId = 0;
        public DrugController(IDurgService drugfService) {
            _drugfService= drugfService;
            
        }
        [HttpGet("GateAll")]
        public async Task<IEnumerable<Drug>> GetAllAsync()
        {
           
            return await _drugfService.GetAllAsync();
        }

        [HttpGet("Get/{id}")]
        public async Task<Drug> Get(int id)
        {
          
            return await _drugfService.GetByIdAsync(id);
        }
        [HttpGet("GetByUserId/{userId}")]
        public async Task<IEnumerable<Drug>> GetByUserId(int userId)
        {
            var abc = Request.HttpContext.Items["User"];
            return await _drugfService.GetByUserId(userId);
        }

        [HttpPost("Create")]
        public async Task<IActionResult>Create(Drug drug)
        {
            await _drugfService.CreateAsync(drug);
            return Ok(drug);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(Drug drug)
        {
             _drugfService.Update(drug);
             return Ok(drug);
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
          await  _drugfService.DeleteAsync(id);
            return Ok("deleted");
        }

    }
}
