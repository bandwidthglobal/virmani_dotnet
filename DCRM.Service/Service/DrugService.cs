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
        public DurgService(IDrugRepository drugRepository)
        {
            _drugRepository = drugRepository;
        }
        /// <summary>
        /// create drug
        /// </summary>
        /// <param name="drug"></param>
        /// <returns></returns>
        public async Task CreateAsync(Drug drug)
        {
          await  _drugRepository.CreateAsync(drug);
        }
        /// <summary>
        /// delete drug 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync(int id)
        {
           await _drugRepository.DeleteAsync(id);
        }
        /// <summary>
        /// get all drugs
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Drug>> GetAllAsync()
        {
           IEnumerable <Drug> drugs= await _drugRepository.GetAllAsync();
            return drugs;
        }
        /// <summary>
        /// get drug by drug id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Drug> GetByIdAsync(int id)
        {
            Drug drug = await _drugRepository.GetByIdAsync(id);
            return drug;
        }
        /// <summary>
        /// get drugs by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public Task<IEnumerable<Drug>> GetByUserId(int userId)
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
    }
}