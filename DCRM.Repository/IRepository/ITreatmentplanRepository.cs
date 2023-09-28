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

        int Create(Treatmentplans treatmentplan);

        void UpdateDealer(Treatmentplans treatmentplan);

        void Delete(int id);

        List<Treatmentplans> GetAll();

        void CreateTeethinfo(Teethinfo teethinfo);
    }
}
