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

        public async Task CreateAsync(Prescription prescription)
        {
            await _contex.Prescription.AddAsync(prescription);
            _contex.SaveChanges();
        }

        public async Task DeleteAsync(int id)
        {
            var prescription = await _contex.Prescription.FirstOrDefaultAsync(x => x.Id == id);
            if (prescription != null)
            {
                _contex.Prescription.Remove(prescription);
                await _contex.SaveChangesAsync();
            }
        }
        public async Task<Prescription> GetByIdAsync(int id)
        {
            var prescription = await _contex.Prescription.FirstOrDefaultAsync(x => x.Id == id );
            return prescription;
        }

        public async Task<IEnumerable<Prescription>> GetByUserId(int userId)
        {
            var prescriptions = _contex.Prescription.Where(x => x.User_Id == userId );
            return prescriptions;
        }

        public List<Prescription> GetAll()
        {
            var prescriptions = _contex.Prescription.ToList();
            return prescriptions;
        }



    }
}