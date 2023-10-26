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
       
        IEnumerable<Drug> GetAll();

        Drug Get(int id);

        IEnumerable<Drug>  GetByUserId(int userId);

        void Create(Drug drug);

        void Update(Drug drug);

        void Delete(int id);
        List<MedicineBrand> GetMedicineBrands();

        List<MedicineCategory> GetMedicineCategoris();

    } 
}
