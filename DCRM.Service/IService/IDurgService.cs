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
        IEnumerable<Drug> GetAll();

        Drug Get(int id);

        IEnumerable<Drug> GetByUserId(int userId);

        void Create(Drug drug);

        void Update(Drug drug);

        void Delete(int id);

        List<MedicineBrand> GetMedicineBrands();

        List<MedicineCategory> GetMedicineCategoris();

        List<MedicineBadStock> GetMedicineBadStocks(int id);

        List<MedicineBatchDetail> GetMedicineStocks(int id);

        void AddStock (MedicineBatchDetail medicineBatchDetail);

        void AddBadStock(MedicineBadStock medicineBadStock);
        void DeleteBadStock(int id);
        void DeleteStock(int id);
    }
}
