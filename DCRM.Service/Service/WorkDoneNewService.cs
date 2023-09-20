using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class WorkDoneNewService:IWorkDoneNewService
    {
        private readonly IRepository<Workdone_New> _repository;
        public WorkDoneNewService(IRepository<Workdone_New> repository) {
            _repository=repository;
        }

        public Workdone_New GetWorkdoneNew(int id)
        {
            Workdone_New workdoneNew = new Workdone_New();
            workdoneNew = _repository.Get(id);
            return workdoneNew;
        }

        public List<Workdone_New> GetWorkdoneNewList()
        {
            List <Workdone_New> workdoneNewList=new List<Workdone_New>();
            workdoneNewList = _repository.GetAll().ToList();
            throw new NotImplementedException();
        }

       public List<Workdone_New> GetWorkdonesByTreatMentId(int treatmentId)
        {
            List<Workdone_New> workdoneNewList = new List<Workdone_New>();
            workdoneNewList = _repository.GetAll().Where(x=>x.Treatment_Id== treatmentId).ToList();
            return workdoneNewList;
        }
    }
}
