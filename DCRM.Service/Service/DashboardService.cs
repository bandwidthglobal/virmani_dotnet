using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;

namespace DCRM.Service.Service
{
    public class DashboardService : IDashboardService
    {
        public readonly IDashboardRepository _dashboardRepository;
        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public DashboardDto Get(int userId)
        {
            DashboardDto dashboardDto = new DashboardDto();
            dashboardDto = _dashboardRepository.Get(userId);
            return dashboardDto;
        }
    }
}