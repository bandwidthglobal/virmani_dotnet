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
        public readonly IPrescriptionService _prescriptionService;
        public PrescriptionController(IPrescriptionService prescriptionService)
        {
            _prescriptionService = prescriptionService;
        }

        [HttpGet("Get/{id}")]
        public PrescriptionDto Get(long id)
        {
            return _prescriptionService.PrescriptionPreview(id);
        }


        [HttpGet("GetAll")]
        public  List<PrescriptionDto> Prescriptions()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return _prescriptionService.GetAll(user.Id);
        }

        

        [HttpPost("Create")]
        public IActionResult Create(Prescription prescription)
        {
            var user = Request.HttpContext.Items["User"] as User;
            prescription.User_Id = user.Id;
            _prescriptionService.Create(prescription);
            return Ok(prescription);
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(long id)
        {
            _prescriptionService.Delete(id);
            return Ok(id);
        }

    }
}
