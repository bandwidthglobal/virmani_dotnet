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
    public interface IDealerRepository
    {
       
        Task<IEnumerable<Dealer>> GetDealersAsync(long userId);

        Task<Dealer> GetDealerByIdAsync(long userId,int id);

        List<Dealer> GetDealerByUserId(int userId);

        List<DealerBankDetail> GetDealerBankDetailDetailList(int dealerId);

        List<DealerMaterial> GetDealerMaterialDetailList(int dealerId);

        Task CreateDealerAsync(DealerRequest request);

        void UpdateDealer(DealerRequest request);

        Task DeleteDealerAsync(long userId, int id);

    } 
}
