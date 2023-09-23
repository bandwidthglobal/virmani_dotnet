using DCRM.Common.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IDashboardService
    {
        DashboardDto Get(int userId);
    }
}
