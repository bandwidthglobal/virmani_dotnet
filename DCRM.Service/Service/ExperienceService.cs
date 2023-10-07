using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class ExperienceService: IExperienceService
    {
        public readonly IRepository<Experience> _repository;

        public ExperienceService(IRepository<Experience> repository)
        {
            _repository=repository;
        }
        public IEnumerable<Experience> GetAll(long userId)
        {
            IEnumerable<Experience> experiences = new List<Experience>();
            experiences = _repository.GetAll().Where(x=>x.User_Id== userId);
            return experiences;
        }
        public Experience Get(long id)
        {
            Experience experience = _repository.Get(id);
            return experience;
        }
        public void Create(Experience experience)
        {
            if (string.IsNullOrEmpty(experience.Details))
            {
                experience.Details= string.Empty;
            }
            _repository.Insert(experience);
        }
        public void Update(Experience experience)
        {
            _repository.Update(experience);
        }
        public void Delete(long id)
        {
            var experience = _repository.Get(id);
            if (experience != null)
            {
                _repository.Remove(experience);
            }
        }
    }
}
