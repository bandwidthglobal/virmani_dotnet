using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace DCRM.Repository.Repository
{
    public class TreatmentplanRepository : ITreatmentplanRepository
    {
        public readonly DCRMDBContext _contex;
        public TreatmentplanRepository(DCRMDBContext contex)
        {
            _contex = contex;
        }
        public List<Treatmentplans> GetAll()
        {
            List<Treatmentplans> treatmentplans = new();
            treatmentplans = _contex.Treatmentplans.Where(x=>x.Status==1).OrderByDescending(x => x.Sitting_Status).ToList();
            return treatmentplans;

        }

        public List<Treatmentplans> GetAll(long patientId)
        {
            return _contex.Treatmentplans.Where(x => x.Patient_Id == patientId && x.Status == 1).OrderByDescending(x => x.Id).ToList();
        }

        public Treatmentplans Get(long id)
        {
            return _contex.Treatmentplans.Where(x => x.Id == id).FirstOrDefault();
        }

        public TreatmentplanDto Edit(long id)
        {
            var lnQuery=(from t in _contex.Treatmentplans
                        join te in _contex.Teethinfo on t.Id equals te.Treatmentplans_Id
                        where t.Id == id
                        select new { t, te }).SingleOrDefault();
            TreatmentplanDto treatmentplan = new();
            if (lnQuery != null)
            {
                treatmentplan.Estimated_Amount = lnQuery.t.Estimated_Amount;
                treatmentplan.PatientId = lnQuery.t.Patient_Id;
                treatmentplan.TreatmentStatus = lnQuery.t.Treatment_Status.ToString();
                treatmentplan.Id = lnQuery.t.Id;
                treatmentplan.Amount = lnQuery.t.Amount;
                treatmentplan.Courtesy = lnQuery.t.Courtesy;
                treatmentplan.JobId = lnQuery.t.Job_Id;
                treatmentplan.Job = lnQuery.t.Job;
                treatmentplan.Teeth_id = lnQuery.te.Teeth_Id;
                treatmentplan.TothNot = lnQuery.te.Toth_Note;
                treatmentplan.Doctor = lnQuery.t.Doctor;
                treatmentplan.Type = lnQuery.te.Type;
                treatmentplan.Teeth_Number_Note = lnQuery.te.Teeth_Number_Note;

            }
            return treatmentplan;
        }

        public int Create(TreatmentplanRequest request)
        {
            _contex.Database.BeginTransaction();
            Treatmentplans treatmentplans = new()
            {
                Amount = request.Estimated_Amount,
                Estimated_Amount = request.Estimated_Amount,
                Courtesy = request.Courtesy,
                Treatment_Status = request.TreatmentStatus,
                Sitting_Status = request.SittingStatus,
                Doctor = request.Doctor,
                Patient_Id = request.PatientId,
                Date = request.Date,
                Job_Id = request.JobId,
                Job = request.Job,
                Status = 1,
                Completed_Date = request.CompletedDate,
                Created_At = System.DateTime.UtcNow,
                Updated_At = System.DateTime.UtcNow,
                Individual_Tooth_Wrk = request.IndividualToothWrk,
                Print_Tooth_Name = request.Teeth_Number_Note
            };
            _contex.Treatmentplans.Add(treatmentplans);
            int id;
            try
            {
                _contex.SaveChanges();
                id = treatmentplans.Id;
                Teethinfo teethinfo = new();
                if (id > 0)
                {
                    teethinfo.Treatmentplans_Id = id;
                    teethinfo.Doc_Id = request.Doctor;
                    teethinfo.Tooth_Patient_Id = request.PatientId;
                    teethinfo.Type = request.Type;
                    teethinfo.Teeth_Id = request.Teeth_id;
                    teethinfo.Teeth_Number_Note = request.Teeth_Number_Note;
                    teethinfo.Toth_Note = request.Treatment_Notes;
                    teethinfo.Note_Status = request.Note_Status ?? "";
                    teethinfo.Ord = request.Ord ?? "";
                    teethinfo.Rmd = request.Rmd ?? "";
                    teethinfo.Treatment_Notes = request.Treatment_Notes ?? "";
                    teethinfo.Date = System.DateTime.UtcNow;
                    _contex.Teethinfo.Add(teethinfo);
                    _contex.SaveChanges();

                }
                _contex.Database.CommitTransaction();
            }
            catch (Exception)
            {
                _contex.Database.RollbackTransaction();
                throw;
            }
            return id;
        }
        public void CreateTeethinfo(Teethinfo teethinfo)
        {
            _contex.Teethinfo.Add(teethinfo);
            _contex.SaveChanges();
        }
        public void UpdateTreatmentplan(Treatmentplans treatmentplan)
        {
            _contex.Treatmentplans.Update(treatmentplan);
            _contex.SaveChanges();
        }
        public void UpdateSittingValue(Treatmentplans treatmentplan)
        {
            var treatment = _contex.Treatmentplans.AsNoTracking().Where(x => x.Id == treatmentplan.Id).FirstOrDefault();
            if (treatment != null)
            {
                treatment.Sitting_Status = treatmentplan.Sitting_Status;
                _contex.Treatmentplans.Update(treatment);
                _contex.SaveChanges();
            }
        }
        public void Delete(long id)
        {
            var treatmentplan = _contex.Treatmentplans.Where(x => x.Id == id).FirstOrDefault();
            if (treatmentplan != null)
            {
                treatmentplan.Status = 0;
                _contex.Treatmentplans.Update(treatmentplan);
                _contex.SaveChanges();
            }
        }

      
    }
}
