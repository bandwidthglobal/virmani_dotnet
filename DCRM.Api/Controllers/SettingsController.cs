using DCRM.Common.Authorization;
using DCRM.Common.Entities;
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
    public class SettingsController : ControllerBase
    {
        private readonly ISettingService _settingService;
        public SettingsController(ISettingService settingService) {
             _settingService=settingService;
        }

        [HttpGet("GetAll/ProsthesisType")]
        public List<Prosthesis_Type> GetAllProsthesisType()
        {

           return _settingService.GetAllProsthesisType();
        }
        [HttpGet("Get/ProsthesisType/{id}")]
        public Prosthesis_Type GetProsthesisType(int id)
        {

            return _settingService.GetProsthesisType(id);
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



        [HttpGet("GetAll/Diagonosis")]
        public List<Diagonosis> GetAllDiagonosis()
        {

            return _settingService.GetAllDiagonosis();
        }
        [HttpGet("Get/Diagonosis/{id}")]
        public Diagonosis GetDiagonosis(int id)
        {

            return _settingService.GetDiagonosis(id);
        }

        [HttpPost("Create/Diagonosis")]
        public IActionResult Diagonosis(Diagonosis diagonosis)
        {
            var user = Request.HttpContext.Items["User"] as User;
            diagonosis.User_Id = user.Id;
            _settingService.CreateDiagonosis(diagonosis);
            return Ok();
        }

        [HttpPost("Update/Diagonosis")]
        public IActionResult UpdateDiagonosis(Diagonosis diagonosis)
        {

            _settingService.UpdateDiagonosis(diagonosis);
            return Ok();
        }

        [HttpDelete("Delete/Diagonosis/{id}")]
        public IActionResult DeleteDiagonosis(int id)
        {

            _settingService.DeleteDiagonosis(id);
            return Ok();
        }
    }
}
