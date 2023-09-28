using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class ChairService : IChairService
    {
        private readonly IRepository<Chair> _repository;
        public ChairService(IRepository<Chair> repository) {
        _repository = repository;
        }
        public void Create(Chair chare)
        {
            _repository.Insert(chare);
        }
        public void delete(int id)
        {
            var chair = _repository.Get(id);
            if (chair != null) {
                chair.Status = 0;
                _repository.Update(chair);
            }
        }

        public Chair Get(int id)
        {
           Chair chair = _repository.Get(id); 
            return chair;
        }

        public List<Chair> GetAll()
        {
            List<Chair> chairs = new List<Chair>(); 
            chairs=_repository.GetAll().ToList();
            return chairs;
        }

        public void Update(Chair chare)
        {
            _repository.Update(chare);
        }
    }
}
