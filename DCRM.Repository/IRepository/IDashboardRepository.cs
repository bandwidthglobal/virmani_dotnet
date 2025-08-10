using DCRM.Common.Dto;

namespace DCRM.Repository.IRepository
{
    public interface IDashboardRepository
    {
        DashboardDto Get(int userId);
    }
}
