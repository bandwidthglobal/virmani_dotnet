using DCRM.Common.Entity;

namespace DCRM.Repository.IRepository
{
    public interface IPrescriptionRepository
    {
        List<Prescription> GetAll();
        Prescription Get(long id);
        
        void Create(Prescription prescription);
        void Delete(long id);

    } 
}
