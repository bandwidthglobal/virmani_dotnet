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
    public interface IAppointmentRepository
    {
       
        IEnumerable<Appointment> GetAll();
        Appointment Get(long id);
        void Create(Appointment request);
        void Update(Appointment request);
        void Delete(long id);



    } 
}
