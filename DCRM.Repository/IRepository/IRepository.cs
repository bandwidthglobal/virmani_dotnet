using DCRM.Common.Entities;

namespace DCRM.Repository.IRepository
{
    public interface IRepository<T> where T : BaseEntity
    {
        IEnumerable<T> GetAll();
        T Get(long Id);
        void Insert(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Remove(T entity);
        public long Create(T entity);
    }
}
