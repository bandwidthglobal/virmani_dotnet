using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
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
    public class TreatmentplanController : ControllerBase
    {
        private readonly ITreatmentplanService _treatmentplanService;
        public TreatmentplanController(ITreatmentplanService treatmentplanService)
        {
            _treatmentplanService = treatmentplanService;
        }

        [HttpPost("Create")]
        public IActionResult Create(TreatmentplanRequest request)
        {
            long id = _treatmentplanService.Create(request);
            return Ok(id);
        }
        [HttpPost("Update")]
        public IActionResult Update(TreatmentplanRequest request)
        {
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

        [HttpGet("Get/Teeth")]
        public List<Teeth> GetTeeths()
        {
            return _treatmentplanService.GetTeeths();
        }

        [HttpGet("Get/TeethCategories")]
        public List<TeethCategory> GetTeethCategories()
        {
            return _treatmentplanService.GetTeethCategories();
        }

        [HttpGet("Get/TeethByCategory/{id}")]
        public List<Teeth> TeethByCategory(int id)
        {
            return _treatmentplanService.GetTeethsByCategory(id);
        }
        [HttpGet("Get/DiagnosisData")]
        public List<DiagnosisDataDto> DiagnosisDataList()
        {
            return _treatmentplanService.GetDiagnosisData();
        }
    }

}

