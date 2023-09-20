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

        public async Task CreateAsync(Drug drug)
        {
            drug.Created_At = System.DateTime.UtcNow;
            drug.Updated_At= System.DateTime.UtcNow;
            drug.Status = 1;
            drug.Is_Delete = 0;
            await _contex.Drugs.AddAsync(drug);
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

        public async Task<IEnumerable<Drug>> GetAllAsync()
        {
            var drugs = _contex.Drugs.Where(x => x.Is_Delete == 0);
            return drugs;
        }

        public async Task<Drug> GetByIdAsync(int id)
        {
            var drug = await _contex.Drugs.FirstOrDefaultAsync(x => x.Id == id);
            return drug;
        }

        public async Task<IEnumerable<Drug>> GetByUserId(int userId)
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
        public void Update(Drug request)
        {
            var drug = _contex.Drugs.FirstOrDefault(x => x.Id == request.Id && x.Is_Delete == 0);
            if (drug != null)
            {
                drug.Reorder_Level = request.Reorder_Level;
                drug.Supplier = request.Supplier;
                drug.User_Id = request.User_Id;
                drug.Status = request.Status;
                drug.Vat = request.Vat;
                drug.Details = request.Details;
                drug.Bactrology = request.Bactrology;
                drug.Basic_Salt = request.Basic_Salt;
                drug.Description = request.Description;
                drug.Dosage = request.Dosage;
                drug.Dose_No = request.Dose_No;
                drug.Form = request.Form;
                drug.Vat_Ac = request.Vat_Ac;
                drug.Medicine_Brand_Id = request.Medicine_Brand_Id;
                drug.Medicine_Category_Id = request.Medicine_Category_Id;
                drug.Medicine_Company = request.Medicine_Company;
                drug.Medicine_Composition = request.Medicine_Composition;
                drug.Medicine_Group = request.Medicine_Group;
                drug.Medicine_Image = request.Medicine_Image;
                drug.Medicine_Name = request.Medicine_Name;
                drug.Medicine_Type = request.Medicine_Type;
                drug.Updated_At = System.DateTime.Now;
                drug.Created_At = System.DateTime.Now;
                _contex.Update(drug);
                _contex.SaveChanges();
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
    }
}