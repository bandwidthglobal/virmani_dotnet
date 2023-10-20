using DCRM.Common.Authorization;
using DCRM.Common.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        [HttpGet]
        public Payment payments()
        {
            Payment payment = new Payment();
            return payment;
        }

    }
}
