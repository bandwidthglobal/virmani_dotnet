using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        public readonly IDashboardService _dashboardService;
        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

       
        [HttpGet("GetUserDashboard")]
        [Authorize("GetUserDashboard")]
        public DashboardDto Get()
        {
            DashboardDto dashboardDto = new DashboardDto();
            var user = Request.HttpContext.Items["User"] as User;
            if (user!=null)
            {
                dashboardDto =  _dashboardService.Get(user.Id);
            }
            return dashboardDto;
        }

        [HttpGet("GetStaffDashboard")]
        [Authorize("Staff")]
        public DashboardDto GetStaffDashboard()
        {
            DashboardDto dashboardDto = new DashboardDto();
            var user = Request.HttpContext.Items["User"] as User;
            if (user != null)
            {
                dashboardDto = _dashboardService.Get(user.Id);
            }
            return dashboardDto;
        }
        [HttpGet("GetDoctorDashboard")]
        [Authorize("Doctor")]
        public DashboardDto GetDoctorDashboard()
        {
            DashboardDto dashboardDto = new DashboardDto();
            var user = Request.HttpContext.Items["User"] as User;
            if (user != null)
            {
                dashboardDto = _dashboardService.Get(user.Id);
            }
            return dashboardDto;
        }
    }
}
