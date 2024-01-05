using DCRM.Common.Entity;

namespace DCRM.Service.IService
{
    public interface IExperienceService
    {
        IEnumerable<Experience> GetAll(long userId);
        Experience Get(long id);
       void Create(Experience experience);
       void Update(Experience experience);
        void Delete(long id);
    }
}
