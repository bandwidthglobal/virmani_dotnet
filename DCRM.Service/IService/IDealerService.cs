using DCRM.Common.Dto;
using DCRM.Common.Entity;

namespace DCRM.Service.IService
{
    public interface IDealerService
    {
        IEnumerable<DealerDto> GetAll(long userId);
         DealerDto GetById(int id);
        long Create(DealerRequest request);
        void Update(DealerRequest request);
        void Delete(long id);
        
        DealerRequest Get(int id);
    }
}
