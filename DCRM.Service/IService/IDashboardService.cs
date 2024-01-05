using DCRM.Common.Dto;

namespace DCRM.Service.IService
{
    public interface IDashboardService
    {
        DashboardDto Get(int userId);
    }
}
