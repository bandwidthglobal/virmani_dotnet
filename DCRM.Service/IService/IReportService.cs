using DCRM.Common.Dto;

namespace DCRM.Service.IService
{
    public interface IReportService
    {
        PatientWorkdoneDetailsDto PatientWorkdoneDetails(long patientId);
    }
}
