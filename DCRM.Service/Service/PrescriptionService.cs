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
using System.Numerics;

namespace DCRM.Service.Service
{
    public class PrescriptionService : IPrescriptionService
    {
        public readonly IPrescriptionRepository _prescriptionRepository;
        public PrescriptionService(IPrescriptionRepository prescriptionRepository)
        {
            _prescriptionRepository = prescriptionRepository;
        }

        public async Task CreateAsync(Prescription request)
        {
            await _prescriptionRepository.CreateAsync(request);
        }

        public async Task DeleteAsync(int id)
        {
            await _prescriptionRepository.DeleteAsync(id);
        }

        public async Task<Prescription> GetByIdAsync(int id)
        {
          var prescription=  await _prescriptionRepository.GetByIdAsync(id);
            return prescription;
        }

        public Task<IEnumerable<Prescription>> GetByUserId(int userId)
        {
            var prescriptions =  _prescriptionRepository.GetByUserId(userId);
            return prescriptions;
        }
    }
}