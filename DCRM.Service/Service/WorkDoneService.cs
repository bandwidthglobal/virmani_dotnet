using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;

namespace DCRM.Service.Service
{
    public class WorkDoneService : IWorkDoneService
    {
        private readonly IRepository<Workdone> _repository;
        private readonly IRepository<Workdone_New> _workdonenewrepository;
        private readonly IRepository<Treatmentplans> _treatmentRepository;
        public WorkDoneService(
            IRepository<Workdone> repository,
             IRepository<Workdone_New> workdonenewrepository,
            IRepository<Treatmentplans> treatmentRepository
            )
        {
            _repository = repository;
            _treatmentRepository = treatmentRepository;
            _workdonenewrepository = workdonenewrepository;
        }
        public List<Workdone> GetAll(long patientId)
        {
            List<Workdone> workdoneList = new();
            workdoneList = _repository.GetAll().Where(x=>x.Wk_Patient_Id==patientId).ToList();
            return workdoneList;
        }

        public Workdone Get(int id)
        {
            Workdone workdone = _repository.Get(id);
            return workdone;
        }

        public Workdone Get(long id)
        {
            throw new NotImplementedException();
        }

        public void Create(Workdone workdone,long treatmentId)
        {
           long id=  _repository.Create(workdone);
            if (id>0)
            {
                var treatment = _treatmentRepository.Get(treatmentId);
                if (treatment!=null)
                {
                    //treatment.Workdone_Id = Convert.ToInt32(id);
                    _treatmentRepository.Update(treatment);
                }
            }
        }

        public void Update(Workdone workdone)
        {
            _repository.Update(workdone);
        }
        public void Delete(long id)
        {
            var workdone = _workdonenewrepository.Get(id);
            _workdonenewrepository.Delete(workdone);
        }

    }
}
