using DCRM.Common.Entity;

namespace DCRM.Service.IService
{
    public interface IWorkDoneService
    {
        List<Workdone> GetAll(long patientId);
        Workdone Get(long id);
        void Create(Workdone workdone,long treatementId);
        void Update(Workdone workdone);
        void Delete(long id);
    }
}
