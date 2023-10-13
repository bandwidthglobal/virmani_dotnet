using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.IRepository
{
    public interface IPrescriptionRepository
    {
        List<Prescription> GetAll();
        Prescription Get(long id);
        
        void Create(Prescription prescription);
        void Delete(long id);

    } 
}
