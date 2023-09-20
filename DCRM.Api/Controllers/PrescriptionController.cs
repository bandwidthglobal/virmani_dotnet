using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class PrescriptionController : ControllerBase
    {
        public readonly IPrescriptionService _prescriptionfService;
        public PrescriptionController(IPrescriptionService prescriptionfService)
        {
            _prescriptionfService = prescriptionfService;
        }

        [HttpGet("Get/{id}")]
        public async Task<Prescription> Get(int id)
        {
            return await _prescriptionfService.GetByIdAsync(id);
        }


        [HttpGet("GetAll")]
        public  List<PrescriptionDto> Prescriptions(int userId)
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            return  _prescriptionfService.GetByUserId(user.Id);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(Prescription prescription)
        {
            await _prescriptionfService.CreateAsync(prescription);
            return Ok(prescription);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _prescriptionfService.DeleteAsync(id);
            return Ok("deleted");
        }

    }
}
