using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IChairService
    {
        List<Chair> GetAll();

        Chair Get(int id);

        void Create(Chair chare);

        void Update(Chair chare);

        void delete(int id);
    }
}
