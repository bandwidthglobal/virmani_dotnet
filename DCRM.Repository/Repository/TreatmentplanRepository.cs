using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
            List<Treatmentplans> treatmentplans = new List<Treatmentplans>();
            treatmentplans = _contex.Treatmentplans.Where(x=>x.Status==1).OrderByDescending(x => x.Id).ToList();
            return treatmentplans;

        }

        public List<Treatmentplans> GetAll(long patientId)
        {
            return _contex.Treatmentplans.Where(x => x.Patient_Id == patientId && x.Status == 1).OrderByDescending(x => x.Id).ToList();
        }

        public Treatmentplans GetById(long id)
        {
            return _contex.Treatmentplans.Where(x => x.Id == id).FirstOrDefault();
        }

        public int Create(TreatmentplanRequest request)
        {
            int id = 0;
            _contex.Database.BeginTransaction();
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
            treatmentplans.Status = 1;
            treatmentplans.Completed_Date = request.CompletedDate;
            treatmentplans.Created_At = System.DateTime.UtcNow;
            treatmentplans.Updated_At = System.DateTime.UtcNow;
            treatmentplans.Individual_Tooth_Wrk = request.IndividualToothWrk;
            treatmentplans.Print_Tooth_Name = request.PrintToothName;
            _contex.Treatmentplans.Add(treatmentplans);
            try
            {
                _contex.SaveChanges();
                id = treatmentplans.Id;
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
                    teethinfo.Note_Status = request.Note_Status==null?"": request.Note_Status;
                    teethinfo.Ord = request.Ord == null ? "" : request.Ord;
                    teethinfo.Rmd = request.Rmd == null ? "" : request.Rmd;
                    teethinfo.Treatment_Notes = request.Treatment_Notes == null ? "" : request.Note_Status;
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
