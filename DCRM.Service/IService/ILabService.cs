using DCRM.Common.Dto;

namespace DCRM.Service.IService
{
    public interface ILabService
    {
        List<LabDataDto> GetLabDataList(long patientId);
    }
}
