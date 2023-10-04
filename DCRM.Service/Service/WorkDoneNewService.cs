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
    public class WorkDoneNewService : IWorkDoneNewService
    {
        private readonly IRepository<Workdone_New> _repository;
        private readonly IRepository<Workdone> _workdonerepository;
        private readonly IPatientRepository _patientRepository;
        private readonly IRepository<Treatmentplans> _treatmentRepository;
        private readonly IRepository<Payment_Details_List> _paymentRepository;
        public WorkDoneNewService(
            IRepository<Workdone_New> repository,
            IRepository<Treatmentplans> treatmentRepository,
            IRepository<Payment_Details_List> paymentRepository,
            IPatientRepository patientRepository
            )
        {
            _repository = repository;
            _paymentRepository = paymentRepository;
            _treatmentRepository = treatmentRepository;
            _patientRepository = patientRepository;

        }

        public Workdone_New GetWorkdoneNew(int id)
        {
            Workdone_New workdoneNew = new Workdone_New();
            workdoneNew = _repository.Get(id);
            return workdoneNew;
        }

        public List<Workdone_New> GetWorkdoneNewList()
        {
            List<Workdone_New> workdoneNewList = new List<Workdone_New>();
            workdoneNewList = _repository.GetAll().ToList();
            throw new NotImplementedException();
        }

        public List<Workdone_New> GetWorkdonesByTreatMentId(int treatmentId)
        {
            List<Workdone_New> workdoneNewList = new List<Workdone_New>();
            workdoneNewList = _repository.GetAll().Where(x => x.Treatment_Id == treatmentId).ToList();
            return workdoneNewList;
        }
        public void Create(Workdone workdone,long treatmentId)
        {
                workdone.Workdone_Date = System.DateTime.Now.ToString();
                var id= _workdonerepository.Create(workdone);
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
            _workdonerepository.Update(workdone);
        }
        //RECEIVE PAYMENT
        
    }
}
