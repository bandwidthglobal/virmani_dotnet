using DCRM.Common.Authorization;
using DCRM.Common.Entity;
using DCRM.Service.IService;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
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
            var user = Request.HttpContext.Items["User"] as User;
            return await _drugfService.GetByUserId(user.Id);
        }

       
        [HttpGet("Get/{id}")]
        public async Task<Drug> Get(int id)
        {
            return await _drugfService.GetByIdAsync(id);
        }

        [AllowAnonymous]
        [HttpGet("GetMedicineBrands")]
        public List<MedicineBrand> GetMedicineBrands()
        {
            return  _drugfService.GetMedicineBrands();
        }
        [AllowAnonymous]
        [HttpGet("GetMedicineCategoris")]
        public List<MedicineCategory> GetMedicineCategoris()
        {
            return _drugfService.GetMedicineCategoris();
        }
        [HttpPost("Create")]
        public async Task<IActionResult>Create(Drug drug)
        {
            var user = Request.HttpContext.Items["User"] as User;
            drug.User_Id = user.Id;
            await _drugfService.CreateAsync(drug);
            return Ok(drug);
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update(Drug drug)
        {

             _drugfService.Update(drug);
             return Ok(drug);
        }

        
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
             _drugfService.Delete(id);
             return Ok(id.ToString());
        }

    }
}
