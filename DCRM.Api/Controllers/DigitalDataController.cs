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
        public List<Patient_Scans> Get(long id)
        {
            List<Patient_Scans> scanDataList = _patientScansService.GetPatientScans(id);
            return scanDataList;
        }
    }
}
