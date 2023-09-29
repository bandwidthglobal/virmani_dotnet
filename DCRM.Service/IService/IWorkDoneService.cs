using DCRM.Common.Entity;
using Demo_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IWorkDoneService
    {
        List<Workdone> GetAll(long patientId);
        Workdone Get(long id);
        void Create(Workdone workdone,long treatementId);
        void Update(Workdone workdone);
        void delete(long id);
    }
}
