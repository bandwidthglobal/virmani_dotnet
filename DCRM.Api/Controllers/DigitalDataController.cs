using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class DigitalDataController : ControllerBase
    {
        public readonly IDigitalDataService _patientScansService;
        public DigitalDataController(IDigitalDataService patientScansService)
        {
            _patientScansService = patientScansService;
        }

        [HttpGet("Get/Patient/{id}")]
        public List<Patient_Scans> GetAll(long id)
        {
            List<Patient_Scans> scanDataList = _patientScansService.GetPatientScans(id);
            return scanDataList;
        }

        [HttpGet("Get/{id}")]
        public Patient_Scans Get(long id)
        {
            Patient_Scans scanData = _patientScansService.Get(id);
            return scanData;
        }

        [HttpPost("Create")]
        public IActionResult Create(Patient_Scans patientScans)
        {
            Patient_Scans scanData = _patientScansService.Create(patientScans);
            return Ok(scanData);
        }
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(long id)
        {
            _patientScansService.Delete(id);
            return Ok(id);
        }
    }
}
