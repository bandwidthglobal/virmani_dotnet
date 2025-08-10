using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using DCRM.Common.Dto;

namespace DCRM.Repository.Repository
{
    public class DashboardRepository : IDashboardRepository
    {
        public readonly DCRMDBContext _contex;
        public DashboardRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        public DashboardDto Get(int userId)
        {
            DashboardDto dashboardDto = new()
            {
                PatientCount = _contex.Patientses.Where(x => x.User_Id == userId && x.Is_Delete == 0).Count(),
                StaffCount = _contex.Staffs.Where(x => x.User_Id == userId && x.Is_Deleted == 0).Count(),
                AppointmentCount = _contex.Appointments.Where(x => x.User_Id == userId && x.Is_Delete == 0).Count(),
                TodayAppointmentCount = _contex.Appointments.Where(x => x.User_Id == userId && x.Is_Delete == 0 && x.Date == System.DateTime.Today).Count()
            };
            return dashboardDto;
        }
    }
}
