using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;

namespace DCRM.Repository.IRepository
{
    public interface ITreatmentplanRepository
    {
        List<Treatmentplans> GetAll(long patientId);

        Treatmentplans Get(long id);

        int Create(TreatmentplanRequest request);

        void UpdateTreatmentplan(Treatmentplans treatmentplan);

        void Delete(long id);

        List<Treatmentplans> GetAll();

        void CreateTeethinfo(Teethinfo teethinfo);

        TreatmentplanDto Edit(long id);

        void UpdateSittingValue(Treatmentplans treatmentplan);
    }
}
