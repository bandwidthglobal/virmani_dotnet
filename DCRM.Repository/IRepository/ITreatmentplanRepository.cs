using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.IRepository
{
    public interface ITreatmentplanRepository
    {
        List<Treatmentplans> GetAll(long patientId);

        Treatmentplans GetById(long id);

        int Create(TreatmentplanRequest request);

        void UpdateTreatmentplan(Treatmentplans treatmentplan);

        void Delete(long id);

        List<Treatmentplans> GetAll();

        void CreateTeethinfo(Teethinfo teethinfo);
    }
}
