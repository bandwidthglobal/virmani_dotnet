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
            treatmentplans = _contex.Treatmentplans.ToList();
            return treatmentplans;

        }

        public List<Treatmentplans> GetAll(long patientId)
        {
            return _contex.Treatmentplans.Where(x => x.Patient_Id == patientId && x.Status == 0).OrderByDescending(x => x.Id).ToList();
        }

        public Treatmentplans GetById(long id)
        {
            return _contex.Treatmentplans.Where(x => x.Id == id).FirstOrDefault();
        }

        public int Create(Treatmentplans treatmentplan)
        {
            int id = 0;

            _contex.Treatmentplans.Add(treatmentplan);
            _contex.SaveChanges();
            return treatmentplan.Id;


        }
        public void CreateTeethinfo(Teethinfo teethinfo)
        {
            _contex.Teethinfo.Add(teethinfo);
            _contex.SaveChanges();
        }
        public void UpdateDealer(Treatmentplans treatmentplan)
        {
            _contex.Treatmentplans.Update(treatmentplan);
            _contex.SaveChanges();
        }

        public void Delete(int id)
        {
            var treatmentplan = _contex.Treatmentplans.Where(x => x.Id == id).FirstOrDefault();
            if (treatmentplan != null)
            {
                treatmentplan.Status = 1;
                _contex.Treatmentplans.Update(treatmentplan);
                _contex.SaveChanges();
            }
        }
    }
}
