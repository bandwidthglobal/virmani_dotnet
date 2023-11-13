using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        public readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("Get")]
        public DashboardDto Get()
        {
            DashboardDto dashboardDto = new DashboardDto();
            var user = Request.HttpContext.Items["User"] as User;
            if (Request.HttpContext.Items["User"] != null)
            {
                dashboardDto = _dashboardService.Get(user.Id);
            }
             return dashboardDto;
        }
    }
}
