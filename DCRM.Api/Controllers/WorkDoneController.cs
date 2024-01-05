using DCRM.Common.Authorization;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkDoneController : ControllerBase
    {
        private readonly IPatientService _patientService;
        private readonly IWorkDoneService _workDoneService;
        private readonly ILogger<WorkDoneController> _logger;
        public WorkDoneController(IPatientService patientService, ILogger<WorkDoneController> logger, IWorkDoneService workDoneService)
        {
            _patientService = patientService;
            _logger = logger;
            _workDoneService= workDoneService;


        }


        [HttpPost("Create/{treatmentId}")]
        public IActionResult Create(Workdone workdone,long treatmentId)
        {
            try
            {
                if (workdone != null)
                {
                    _workDoneService.Create(workdone, treatmentId);
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

        [HttpPost("Update")]
        public IActionResult Update(Workdone workdone)
        {
            try
            {
                if (workdone != null)
                {
                    _workDoneService.Update(workdone);
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

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _workDoneService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                throw;
            }

        }

    }
}
