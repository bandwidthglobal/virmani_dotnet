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
        Task<IEnumerable<DealerDto>> GetAllAsync();
         Task<DealerDto> GetByIdAsync(int id);
        Task CreateAsync(DealerRequest request);
        void Update(DealerRequest request);
        Task DeleteAsync(int id);
        Task<List<DealerDto>> GetByUserId(int userId);
       
    }
}
