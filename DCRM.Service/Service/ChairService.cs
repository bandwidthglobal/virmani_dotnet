using DCRM.Common.Dto;
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
        private readonly IRepository<Doctor> _doctorRepository;
        public ChairService(IRepository<Chair> repository, IRepository<Doctor> doctorRepository) {
        _repository = repository;
            _doctorRepository= doctorRepository;
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

        public List<ChairDto> GetAll()
        {
            List<ChairDto> chairList = new List<ChairDto>(); 
           var chairs=_repository.GetAll().OrderByDescending(x=>x.Id).ToList();
            foreach (var item in chairs)
            {
                ChairDto chair = new ChairDto();
                chair.Id = item.Id;
                chair.Name = item.Name;
                chair.Appoinment_Limit = Convert.ToString(item.Appoinment_Limit);
                chair.Address = item.Address;
                chair.Status = "Active";    
                if (item.Status == 0)
                {
                    chair.Status = "Inactive";
                }
                var doctor= _doctorRepository.Get(item.Doctor_Id);
                if (doctor!=null)
                {
                    chair.DoctorName = doctor.Name;
                }
                else
                {
                    chair.DoctorName = "";
                }
                chairList.Add(chair);
            }
            return chairList;
        }

        public void Update(Chair chare)
        {
            _repository.Update(chare);
        }
    }
}
