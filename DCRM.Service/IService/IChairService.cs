using DCRM.Common.Dto;
using DCRM.Common.Entity;

namespace DCRM.Service.IService
{
    public interface IChairService
    {
        List<ChairDto> GetAll();

        Chair Get(int id);

        void Create(Chair chare);

        void Update(Chair chare);

        void Delete(int id);

        List<ChairDto> GetChairsForDropdown(long userId);
    }
}
