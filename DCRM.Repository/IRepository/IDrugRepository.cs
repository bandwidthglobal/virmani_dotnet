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
    public interface IDrugRepository
    {
       
        Task<IEnumerable<Drug>> GetAllAsync();

        Task<Drug> GetByIdAsync(int id);

        Task<IEnumerable<Drug>>  GetByUserId(int userId);

        Task CreateAsync(Drug drug);

        void Update(Drug drug);

        Task DeleteAsync(int id);

    } 
}
