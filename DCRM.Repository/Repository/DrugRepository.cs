using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

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
            List<MedicineBrand> medicineBrands = new List<MedicineBrand>();
            var list = _contex.Master_Data.Where(t=>t.TypeId==1).ToList();
            var listTypes = _contex.Master_Type.ToList();
            foreach (var data in list)
            {
                MedicineBrand masterData = new MedicineBrand();
                masterData.Id = data.Id;
                masterData.Medicine_Brand = data.Name;
                masterData.Basic_Salt = data.Basic_Salt;
                masterData.Company_Name = data.Company_Name;
                medicineBrands.Add(masterData);
            }
            //var medicineBrands = _contex.Medicine_Brand.ToList();
            return medicineBrands;
        }
        public List<MedicineCategory> GetMedicineCategoris()
        {
            List<MedicineCategory> medicineCategoris = new List<MedicineCategory>();
            var list = _contex.Master_Data.Where(t => t.TypeId == 2).ToList();
            var listTypes = _contex.Master_Type.ToList();
            foreach (var data in list)
            {
                MedicineCategory masterData = new MedicineCategory();
                masterData.Id = data.Id;
                masterData.Medicine_Category = data.Name;
                medicineCategoris.Add(masterData);
            }
            //var medicineCategoris = _contex.Medicine_Category.ToList();
            return medicineCategoris;
        }
        public void Update(Drug drug)
        {
            drug.Updated_At=System.DateTime.Now;
            _contex.Update(drug);
            _contex.SaveChanges();
        }


        public void CreateMaster(MasterData obj)
        {
            obj.Created_At = System.DateTime.UtcNow;
            obj.Updated_At = System.DateTime.UtcNow;
            _contex.Master_Data.Add(obj);
            _contex.SaveChanges();

        }
        public void UpdateMaster(MasterData obj)
        {
            obj.Updated_At = System.DateTime.Now;
            _contex.Update(obj);
            _contex.SaveChanges();
        }
        public void DeleteMaster(int id)
        {
            var obj = _contex.Master_Data.FirstOrDefault(x => x.Id == id);
            if (obj != null)
            {
               
                _contex.Master_Data.Remove(obj);
                _contex.SaveChanges();
            }
        }
        public MasterData GetMaster(int id)
        {
            var obj = _contex.Master_Data.FirstOrDefault(x => x.Id == id);
            return obj;
        }

        public List<MasterDataDto> GetAllMaster()
        {
            List<MasterDataDto> masterList = new List<MasterDataDto>();
            var list = _contex.Master_Data.ToList();
            var listTypes = _contex.Master_Type.ToList();
            foreach (var data in list)
            {
                MasterDataDto masterData = new MasterDataDto();
                masterData.Id = data.Id;
                masterData.Name = data.Name;
                masterData.Basic_Salt = data.Basic_Salt;
                masterData.Company_Name = data.Company_Name;
                masterData.TypeId = data.TypeId;
                masterData.MasterType = listTypes.FirstOrDefault(t => t.Id == data.TypeId)?.Name;
                masterData.ParentId = data.ParentId;
                masterData.Created_At = data.Created_At;
                masterData.Updated_At = data.Updated_At;
                masterList.Add(masterData);
            }
            return masterList;
        }
        public List<MasterType> GetAllMasterType()
        {
            var list = _contex.Master_Type.ToList();            
            return list;
        }
    }
}