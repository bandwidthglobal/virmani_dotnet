using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class TreatmentplanService : ITreatmentplanService
    {
        public readonly ITreatmentplanRepository _treatmentplanRepository;
        public readonly IRepository<Workdone_New> _workDoneRepository;
        public readonly IRepository<Teethinfo> _teethInfoRepository;
        public TreatmentplanService(ITreatmentplanRepository treatmentplanRepository
            , IRepository<Workdone_New> workDoneRepository,
            IRepository<Teethinfo> teethInfoRepository)
        {
            _treatmentplanRepository = treatmentplanRepository;
            _workDoneRepository = workDoneRepository;
            _teethInfoRepository = teethInfoRepository;
        }

        /// <summary>
        /// get all treatment by patient
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<Treatmentplans> GetAll(int patientId)
        {
            return _treatmentplanRepository.GetAll(patientId);
        }

        /// <summary>
        /// get treatment by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Treatmentplans GetById(int id)
        {
            return _treatmentplanRepository.GetById(id);
        }
        /// <summary>
        /// create treementplan
        /// </summary>
        /// <param name="request"></param>
        /// <exception cref="Exception"></exception>
        public void Create(TreatmentplanRequest request)
        {
            try
            {
                int id = 0;
                Treatmentplans treatmentplans = new Treatmentplans();
                treatmentplans.Amount = request.Amount;
                treatmentplans.Courtesy = request.Courtesy;
                treatmentplans.Treatment_Status = request.TreatmentStatus;
                treatmentplans.Sitting_Status = request.SittingStatus;
                treatmentplans.Doctor = request.Doctor;
                treatmentplans.Patient_Id = request.PatientId;
                treatmentplans.Date = request.Date;
                treatmentplans.Job_Id = request.JobId;
                treatmentplans.Job = request.Job;
                treatmentplans.Status = request.Status;
                treatmentplans.Completed_Date = request.CompletedDate;
                treatmentplans.Created_At = System.DateTime.UtcNow;
                treatmentplans.Updated_At = System.DateTime.UtcNow;
                treatmentplans.Individual_Tooth_Wrk = request.IndividualToothWrk;
                treatmentplans.Print_Tooth_Name = request.PrintToothName;
                id = _treatmentplanRepository.Create(treatmentplans);
                Teethinfo teethinfo = new Teethinfo();
                if (id > 0)
                {
                    teethinfo.Treatmentplans_Id = id;
                    teethinfo.Doc_Id = request.Doctor;
                    teethinfo.Tooth_Patient_Id = request.PatientId;
                    teethinfo.Type = request.Type;
                    teethinfo.Teeth_Id = request.Teeth_id;
                    teethinfo.Teeth_Number_Note = request.Teeth_Number_Note;
                    teethinfo.Toth_Note = request.Toth_Note;
                    teethinfo.Date = System.DateTime.UtcNow;
                    _teethInfoRepository.Create(teethinfo);

                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        /// <summary>
        /// update treatment
        /// </summary>
        /// <param name="request"></param>
        public void Update(TreatmentplanRequest request)
        {
            var treatmentplans = _treatmentplanRepository.GetById(request.Id);
            if (treatmentplans != null)
            {
                treatmentplans.Amount = request.Amount;
                treatmentplans.Courtesy = request.Courtesy;
                treatmentplans.Treatment_Status = request.TreatmentStatus;
                treatmentplans.Sitting_Status = request.SittingStatus;
                treatmentplans.Doctor = request.Doctor;
                treatmentplans.Patient_Id = request.PatientId;
                treatmentplans.Date = request.Date;
                treatmentplans.Job_Id = request.JobId;
                treatmentplans.Job = request.Job;
                treatmentplans.Status = request.Status;
                treatmentplans.Completed_Date = request.CompletedDate;
                treatmentplans.Updated_At = System.DateTime.UtcNow;
                treatmentplans.Individual_Tooth_Wrk = request.IndividualToothWrk;
                treatmentplans.Print_Tooth_Name = request.PrintToothName;
                _treatmentplanRepository.UpdateTreatmentplan(treatmentplans);
                var teethIno = _teethInfoRepository.GetAll().Where(x => x.Treatmentplans_Id == treatmentplans.Id).FirstOrDefault();
                if (teethIno != null)
                {
                    teethIno.Doc_Id = request.Doctor;
                    teethIno.Tooth_Patient_Id = request.PatientId;
                    teethIno.Type = request.Type;
                    teethIno.Teeth_Id = request.Teeth_id;
                    teethIno.Teeth_Number_Note = request.Teeth_Number_Note;
                    teethIno.Toth_Note = request.Toth_Note;
                    teethIno.Date = System.DateTime.UtcNow;
                    _teethInfoRepository.Update(teethIno);
                }


            }
        }

        /// <summary>
        /// delete treatment
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void Delete(long id)
        {
            _treatmentplanRepository.Delete(id);
        }

        /// <summary>
        /// create work done for treatment
        /// </summary>
        /// <param name="workdone"></param>
        public void CreateWorkDone(Workdone_New workdone)
        {
            _workDoneRepository.Insert(workdone);
            var treatment = _treatmentplanRepository.GetById(workdone.Treatment_Id);
            if (treatment == null)
            {
                treatment.Status = workdone.Workdone_Status;
                treatment.Updated_At = System.DateTime.UtcNow;
                _treatmentplanRepository.UpdateTreatmentplan(treatment);
            }
        }
    
    }
}
