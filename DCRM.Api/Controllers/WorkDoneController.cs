using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkDoneController : ControllerBase
    {
        private readonly IPatientService _patientService;
        private readonly IWorkDoneNewService _workDoneService;
        private readonly ILogger<WorkDoneController> _logger;
        public WorkDoneController(IPatientService patientService, ILogger<WorkDoneController> logger, IWorkDoneNewService workDoneService)
        {
            _patientService = patientService;
            _logger = logger;
            _workDoneService= workDoneService;


        }

        [HttpPost("Create")]
        public IActionResult Post(Workdone_New workdone)
        {
            try
            {
                if (workdone != null)
                {
                    _patientService.CreatedWorkDone(workdone);
                    return Ok("created");
                }
                else
                {
                    _logger.LogInformation("Bad Request");
                    throw new BadHttpRequestException("Bad Request");
                }

            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                throw;
            }

        }


        [AllowAnonymous]
        [HttpGet("GetWorkdoneByTreatment/{treatmentId}")]

        public List<Workdone_New> GetWorkdoneByTreatment(int treatmentId)
        {
            List<Workdone_New> workdoneList= new List<Workdone_New>();
            workdoneList = _workDoneService.GetWorkdonesByTreatMentId(treatmentId);
            return workdoneList;

        }

        [HttpGet("GetWorkDonesByPatient/{patientId}")]
        public List<WorkDoneDto> GetWorkDonesByPatient(int patientId)
        {
            List<WorkDoneDto> workdoneList = _patientService.GetPatientWorkDoneList(patientId);
            return workdoneList;
        }
    }
}
