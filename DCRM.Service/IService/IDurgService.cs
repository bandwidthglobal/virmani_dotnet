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
    public interface IDurgService
    {
        Task<IEnumerable<Drug>> GetAllAsync();

        Task<Drug> GetByIdAsync(int id);

        Task<IEnumerable<Drug>> GetByUserId(int userId);

        Task CreateAsync(Drug drug);

        void Update(Drug drug);

        void Delete(int id);

        List<MedicineBrand> GetMedicineBrands();

        List<MedicineCategory> GetMedicineCategoris();

        List<MedicineBadStock> GetMedicineBadStocks(int id);

        List<MedicineBatchDetail> GetMedicineStocks(int id);
        void DeleteBadStock(int id);
        void DeleteStock(int id);
    }
}
