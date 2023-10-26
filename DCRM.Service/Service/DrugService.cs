using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Numerics;

namespace DCRM.Service.Service
{
    public class DurgService : IDurgService
    {
        public readonly IDrugRepository _drugRepository;
        public readonly IRepository<MedicineBadStock> _badStockRepository;
        public readonly IRepository<MedicineBatchDetail> _stockRepository;
        public DurgService(IDrugRepository drugRepository, IRepository<MedicineBadStock> badStockRepository, IRepository<MedicineBatchDetail> stockRepository)
        {
            _drugRepository = drugRepository;
            _badStockRepository = badStockRepository;
            _stockRepository = stockRepository;
        }
        /// <summary>
        /// create drug
        /// </summary>
        /// <param name="drug"></param>
        /// <returns></returns>
        public void Create(Drug drug)
        {
           _drugRepository.Create(drug);
        }
        /// <summary>
        /// delete drug 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public void Delete(int id)
        {
            _drugRepository.Delete(id);
        }
        /// <summary>
        /// get all drugs
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Drug> GetAll()
        {
           IEnumerable <Drug> drugs=  _drugRepository.GetAll();
            return drugs;
        }
        /// <summary>
        /// get drug by drug id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Drug Get(int id)
        {
            Drug drug =  _drugRepository.Get(id);
            return drug;
        }
        /// <summary>
        /// get drugs by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public IEnumerable<Drug> GetByUserId(int userId)
        {
            var drugs = _drugRepository.GetByUserId(userId);
            return drugs;
        }
        /// <summary>
        /// update drug
        /// </summary>
        /// <param name="drug"></param>
        public void Update(Drug drug)
        {
              _drugRepository.Update(drug);
        }

       public List<MedicineBrand> GetMedicineBrands() {
         return _drugRepository.GetMedicineBrands();
        }

        public List<MedicineCategory> GetMedicineCategoris() {
            return _drugRepository.GetMedicineCategoris();
        }

        public List<MedicineBadStock> GetMedicineBadStocks(int drugId)
        {
            var medicineBadStockList = _badStockRepository.GetAll().Where(x => x.Pharmacy_Id == drugId && x.Is_Deleted==0).OrderByDescending(x=>x.Id).ToList();
            return medicineBadStockList;
        }

        public List<MedicineBatchDetail> GetMedicineStocks(int drugId )
        {
            var medicineStockList = _stockRepository.GetAll().Where(x => x.Medicine_Id == drugId && x.Is_Deleted == 0).OrderByDescending(x => x.Id).ToList();
            return medicineStockList;
        }
        public void AddStock(MedicineBatchDetail medicineBatchDetail)
        {
            medicineBatchDetail.Updated_At=System.DateTime.Now;
            medicineBatchDetail.Is_Deleted = 0;
            _stockRepository.Create(medicineBatchDetail);

        }
        public void AddBadStock(MedicineBadStock medicineBadStock)
        {
            medicineBadStock.Is_Deleted = 0;
            _badStockRepository.Create(medicineBadStock);

        }
        public void DeleteBadStock(int id)
        {
            var badStock= _badStockRepository.Get(id);
            badStock.Is_Deleted = 1;
            _badStockRepository.Update(badStock);

        }

        public void DeleteStock(int id)
        {
            var stock = _stockRepository.Get(id);
            stock.Is_Deleted = 1;
            _stockRepository.Update(stock);
        }
    }
}