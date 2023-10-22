using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Data.SqlTypes;

namespace DCRM.Repository.Repository
{
    public class PrescriptionRepository : IPrescriptionRepository
    {

        public readonly DCRMDBContext _contex;
        public PrescriptionRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        public void Create(Prescription prescription)
        {
            _contex.Prescription.Add(prescription);
            _contex.SaveChanges();
        }

        public void Delete(long id)
        {
            var prescription =  _contex.Prescription.FirstOrDefault(x => x.Id == id);
            if (prescription != null)
            {
                _contex.Prescription.Remove(prescription);
                _contex.SaveChanges();
            }
        }
        public Prescription Get(long id)
        {
            var prescription = _contex.Prescription.FirstOrDefault(x => x.Id == id );
            return prescription;
        }
               
        public List<Prescription> GetAll()
        {
            var prescriptions = _contex.Prescription.OrderByDescending(x=>x.Id).ToList();
            return prescriptions;
        }

        

    }
}