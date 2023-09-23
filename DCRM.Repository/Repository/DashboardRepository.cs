using DCRM.Common.Entity;
using DCRM.Common;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
            DashboardDto dashboardDto = new DashboardDto();
            var patientCount = _contex.Patientses.Where(x => x.User_Id == userId && x.Is_Delete == 0).ToList().Count;
            var staffCount = _contex.Staffs.Where(x => x.User_Id == userId && x.Is_Deleted == 0).ToList().Count;
            var appointmentCount = _contex.Appointments.Where(x => x.User_Id == userId && x.Is_Delete == 0).ToList().Count;
            var todayAppointmentCount = _contex.Appointments.Where(x => x.User_Id == userId && x.Is_Delete == 0 && x.Date==System.DateTime.Today).ToList().Count;
            dashboardDto.PatientCount = patientCount;
            dashboardDto.StaffCount = staffCount;
            dashboardDto.AppointmentCount = appointmentCount;
            dashboardDto.TodayAppointmentCount = todayAppointmentCount;
            return dashboardDto;
        }
    }
}
