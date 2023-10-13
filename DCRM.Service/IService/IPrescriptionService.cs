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
        Prescription Get(long id);

        List<PrescriptionDto> GetAll(long userId);

        void Create(Prescription request);

        void Delete(long id);

        List<PrescriptionDto> GetPatientPrescriptions(long patientId);

        PrescriptionDto PrescriptionPreview(long id);

    }
}
