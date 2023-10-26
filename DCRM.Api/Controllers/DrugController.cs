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
        public IEnumerable<Drug> GetAll()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return  _drugfService.GetByUserId(user.Id);
        }

       
        [HttpGet("Get/{id}")]
        public Drug Get(int id)
        {
            return  _drugfService.Get(id);
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
        public IActionResult Create(Drug drug)
        {
            var user = Request.HttpContext.Items["User"] as User;
            drug.User_Id = user.Id;
             _drugfService.Create(drug);
            return Ok(drug);
        }

        [HttpPost("Update")]
        public IActionResult Update(Drug drug)
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

        [HttpGet("Get/MedicineBadStocks/{id}")]
        public List<MedicineBadStock> GetMedicineBadStocks(int id)
        {
            return _drugfService.GetMedicineBadStocks(id);
        }

        [HttpGet("Get/MedicineStocks/{id}")]
        public List<MedicineBatchDetail> GetMedicineStocks(int id)
        {
            return _drugfService.GetMedicineStocks(id);
        }


        [HttpPost("AddStock")]
        public IActionResult AddStock(MedicineBatchDetail medicineBatchDetail)
        {
            _drugfService.AddStock(medicineBatchDetail);
            return Ok();
        }

        [HttpPost("AddBadStock")]
        public IActionResult AddBadStock(MedicineBadStock medicineBadStock)
        {
            _drugfService.AddBadStock(medicineBadStock);
            return Ok();
        }

        [HttpDelete("Delete/MedicineBadStock/{id}")]
        public IActionResult DeleteMedicineBadStock(int id)
        {
            _drugfService.DeleteBadStock(id);
            return Ok(id.ToString());
        }

        [HttpDelete("Delete/MedicineStock/{id}")]
        public IActionResult DeleteMedicineStock(int id)
        {
            _drugfService.DeleteStock(id);
            return Ok(id.ToString());
        }
    }
}
