using DCRM.Common.Dto;
using DCRM.Common.Entity;

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
