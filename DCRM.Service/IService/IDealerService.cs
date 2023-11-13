using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IDealerService
    {
        IEnumerable<DealerDto> GetAll(long userId);
         DealerDto GetById(int id);
        long Create(DealerRequest request);
        void Update(DealerRequest request);
        void Delete(long id);
        
        DealerRequest Get(int id);
    }
}
