using DCRM.Common.Entity;

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
