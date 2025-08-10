using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;

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
        public void Delete(int id)
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
            List<ChairDto> chairList = new(); 
           var chairs=_repository.GetAll().OrderByDescending(x=>x.Id).ToList();
            foreach (var item in chairs)
            {
                ChairDto chair = new()
                {
                    Id = item.Id,
                    User_Id = item.User_Id,
                    Name = item.Name,
                    Appoinment_Limit = Convert.ToString(item.Appoinment_Limit),
                    Address = item.Address,
                    Status = "Active"
                };
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

        public List<ChairDto> GetChairsForDropdown(long userId)
        {
            List<ChairDto> chairList = new();
            var chairs = _repository.GetAll().Where(x=>x.User_Id== userId && x.Status==1).OrderByDescending(x => x.Id ).ToList();
            foreach (var item in chairs)
            {
                ChairDto chair = new()
                {
                    Id = item.Id,
                    User_Id = item.User_Id,
                    Name = item.Name,
                    Appoinment_Limit = Convert.ToString(item.Appoinment_Limit),
                    Address = item.Address,
                    Status = "Active"
                };
                if (item.Status == 0)
                {
                    chair.Status = "Inactive";
                }
                var doctor = _doctorRepository.Get(item.Doctor_Id);
                if (doctor != null)
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
