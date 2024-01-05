using DCRM.Common.Entity;

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
