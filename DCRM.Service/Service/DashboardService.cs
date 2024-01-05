using DCRM.Common.Dto;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;

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
            _ = new DashboardDto();
            DashboardDto dashboardDto = _dashboardRepository.Get(userId);
            return dashboardDto;
        }
    }
}