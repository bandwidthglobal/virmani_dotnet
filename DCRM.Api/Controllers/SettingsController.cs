using DCRM.Common.Authorization;
using DCRM.Common.Entities;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly SettingService _settingService;
        public SettingsController(SettingService settingService) {
             _settingService=settingService;
        }

        [HttpPost("Create/ProsthesisType")]
        public IActionResult CreateProsthesisType(Prosthesis_Type prosthesis) {

            _settingService.CreateProsthesisType(prosthesis);
            return Ok();
        }

        [HttpPost("Update/ProsthesisType")]
        public IActionResult UpdateProsthesisType(Prosthesis_Type prosthesis)
        {

            _settingService.UpdateProsthesisType(prosthesis);
            return Ok();
        }

        [HttpDelete("Delete/ProsthesisType/{id}")]
        public IActionResult DeleteProsthesisType(long id)
        {

            _settingService.DeleteProsthesisType(id);
            return Ok();
        }
    }
}
