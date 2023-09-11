using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IPrescriptionService
    {
        Task<Prescription> GetByIdAsync(int id);

        List<PrescriptionDto> GetByUserId(int userId);

        Task CreateAsync(Prescription request);

        Task DeleteAsync(int id);

        List<PrescriptionDto> GetPrescriptions(int userId,int patientId);

        List<PrescriptionDto> GetPrescriptions(int patientId);

    }
}
