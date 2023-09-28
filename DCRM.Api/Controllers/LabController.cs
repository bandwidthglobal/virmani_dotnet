using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{

    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class LabController : ControllerBase
    {
        private readonly ILabService _labService;
        public LabController(ILabService labService)
        {
            _labService = labService;
        }

        [HttpGet("Get/Patient/{id}")]
        public List<LabDataDto> Get(long id)
        {

                List<LabDataDto> labDataList = _labService.GetLabDataList(id);
                return labDataList;
        }
    }
}
