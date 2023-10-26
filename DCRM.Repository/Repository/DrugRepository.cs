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
    public class DrugRepository : IDrugRepository
    {

        public readonly DCRMDBContext _contex;
        public DrugRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        public void Create(Drug drug)
        {
            drug.Created_At = System.DateTime.UtcNow;
            drug.Updated_At= System.DateTime.UtcNow;
            drug.Status = 1;
            drug.Is_Delete = 0;
             _contex.Drugs.Add(drug);
            _contex.SaveChanges();

        }

        public void Delete(int id)
        {
            var drug =  _contex.Drugs.FirstOrDefault(x => x.Id == id);
            if (drug != null)
            {
                drug.Is_Delete = 1;
                _contex.Drugs.Update(drug);
                 _contex.SaveChanges();
            }
        }

        public IEnumerable<Drug> GetAll()
        {
            var drugs = _contex.Drugs.Where(x => x.Is_Delete == 0);
            return drugs;
        }

        public Drug Get(int id)
        {
            var drug =  _contex.Drugs.FirstOrDefault(x => x.Id == id);
            return drug;
        }

        public IEnumerable<Drug> GetByUserId(int userId)
        {
            var drugs = _contex.Drugs.Where(x => x.User_Id == userId && x.Is_Delete == 0).OrderByDescending(x=>x.Id);
            return drugs;
        }
        public List<MedicineBrand> GetMedicineBrands()
        {
            var medicineBrands = _contex.Medicine_Brand.ToList();
            return medicineBrands;
        }
        public List<MedicineCategory> GetMedicineCategoris()
        {
            var medicineCategoris = _contex.Medicine_Category.ToList();
            return medicineCategoris;
        }
        public void Update(Drug drug)
        {
            drug.Updated_At=System.DateTime.Now;
            _contex.Update(drug);
            _contex.SaveChanges();
        }
    }
}