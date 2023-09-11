using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface ITreatmentplanService
    {
        List<Treatmentplans> GetAll(int patientId);

        Treatmentplans GetById(int id);

        void Create(TreatmentplanRequest request);

        void UpdateDealer(TreatmentplanRequest request);

        void Delete(int id);
    }
}
