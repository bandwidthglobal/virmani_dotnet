using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IExperienceService
    {
        IEnumerable<Experience> GetAll(long userId);
        Experience Get(long id);
       void Create(Experience experience);
       void Update(Experience experience);
        void Delete(long id);
    }
}
