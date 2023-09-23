using DCRM.Common.Entity;
using DCRM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DCRM.Common.Dto;

namespace DCRM.Repository.IRepository
{
    public interface IDashboardRepository
    {
        DashboardDto Get(int userId);
    }
}
