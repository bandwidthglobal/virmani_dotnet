using DCRM.Common;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {

        public readonly ILoginService _loginService;
        public AuthenticateController(ILoginService loginService)
        {
            _loginService = loginService;
        }
        [HttpPost("{type}")]
        public IActionResult Post(string type, AuthenticateRequest request)
        {
            
            if (type.ToLower() == "user" || type.ToLower() == "admin")
            {
                return Ok(_loginService.UserAuthenticate(request));
            }
            else if (type.ToLower() == "patient")
            {
                return Ok(_loginService.PatientAuthenticate(request));
            }
            else if (type.ToLower() == "doctor")
            {
                return Ok(_loginService.DoctorAuthenticate(request));
            }
            else
            {
                return Ok(_loginService.StaffAuthenticate(request));
            }
        }
    }
}
