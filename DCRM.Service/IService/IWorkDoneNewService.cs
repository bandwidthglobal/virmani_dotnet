using DCRM.Common.Entity;
using Demo_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IWorkDoneNewService
    {
        List<Workdone_New> GetWorkdoneNewList();
        Workdone_New GetWorkdoneNew(int id);

        List<Workdone_New> GetWorkdonesByTreatMentId(int id);

        void Create(Workdone workdone, long treatmentId);



    }
}
