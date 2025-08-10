using DCRM.Common.Entity;

namespace DCRM.Service.IService
{
    public interface IWorkDoneNewService
    {
        List<Workdone_New> GetWorkdoneNewList();
        Workdone_New GetWorkdoneNew(int id);

        List<Workdone_New> GetWorkdonesByTreatMentId(int id);

        void Create(Workdone workdone, long treatmentId);



    }
}
