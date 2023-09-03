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
       
        Task<Prescription> GetByIdAsync(int id);

        Task<IEnumerable<Prescription>> GetByUserId(int userId);

        Task CreateAsync(Prescription request);

        Task DeleteAsync(int id);

    } 
}
