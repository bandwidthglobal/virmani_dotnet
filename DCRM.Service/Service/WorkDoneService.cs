using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Demo_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Twilio.TwiML.Fax;

namespace DCRM.Service.Service
{
    public class WorkDoneService : IWorkDoneService
    {
        private readonly IRepository<Workdone> _repository;
        private readonly IRepository<Treatmentplans> _treatmentRepository;
        public WorkDoneService(
            IRepository<Workdone> repository,
            IRepository<Treatmentplans> treatmentRepository
            )
        {
            _repository = repository;
            _treatmentRepository = treatmentRepository;

        }
        public List<Workdone> GetAll(long patientId)
        {
            List<Workdone> workdoneList = new List<Workdone>();
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
        public void delete(long id)
        {
            var workdone = _repository.Get(id);
            _repository.Delete(workdone);
        }

    }
}
