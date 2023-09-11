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
        public TreatmentplanService(ITreatmentplanRepository treatmentplanRepository)
        {
            _treatmentplanRepository = treatmentplanRepository;
        }

        /// <summary>
        /// create treementplan
        /// </summary>
        /// <param name="request"></param>
        /// <exception cref="Exception"></exception>
        public void Create(TreatmentplanRequest request)
        {
            Treatmentplans treatmentplans = new Treatmentplans();
            int id = 0;
            try
            {
                treatmentplans = new Treatmentplans();
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
                if (id > 0)
                {
                    request.Teethinfo.Treatmentplans_Id= id;
                    _treatmentplanRepository.CreateTeethinfo(request.Teethinfo);
                }

            }
            catch (Exception ex)
            {
                _treatmentplanRepository.Delete(id);
                throw new Exception(ex.Message);
            }

        }

        /// <summary>
        /// delete treatment
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void Delete(int id)
        {
            throw new NotImplementedException();
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
        /// update treatment
        /// </summary>
        /// <param name="request"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void UpdateDealer(TreatmentplanRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
