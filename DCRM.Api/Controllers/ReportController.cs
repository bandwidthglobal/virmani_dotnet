using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        readonly IReportService _reportService;
        public ReportController(IReportService reportService)
        {
            _reportService=reportService;
        }

        [HttpGet("Get/WorkDoneDetails/{id}")]
        public PatientWorkdoneDetailsDto PatientWorkdoneDetails(long id)
        {
            PatientWorkdoneDetailsDto workdone = _reportService.PatientWorkdoneDetails(id);
            return workdone;
        }

    }
}
