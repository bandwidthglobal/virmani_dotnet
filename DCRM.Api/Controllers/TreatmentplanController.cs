using DCRM.Common.Authorization;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentplanController : ControllerBase
    {
        private readonly ITreatmentplanService _treatmentplanService;
        public  TreatmentplanController(ITreatmentplanService treatmentplanService)
        {
            _treatmentplanService = treatmentplanService;
        }

        [HttpPost("Create")]
        public IActionResult Create(TreatmentplanRequest request)
        {
            _treatmentplanService.Create(request);
            return Ok();
        }
        [HttpPost("Update")]
        public IActionResult Update(TreatmentplanRequest request) {
            _treatmentplanService.Update(request);
            return Ok();
        }

        [HttpPost("Delete")]
        public IActionResult Delete(long id)
        {
            _treatmentplanService.Delete(id);
            return Ok();
        }

        [HttpPost("WorkDone/Create")]
        public IActionResult WorkDoneCreate(Workdone_New workdone)
        {
            _treatmentplanService.CreateWorkDone(workdone);
            return Ok();
        }
    }
}
