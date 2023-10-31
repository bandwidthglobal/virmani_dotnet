using DCRM.Common.Entities;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class SettingService : ISettingService
    {
        private readonly IRepository<Prosthesis_Type> _prosthesisTypeRepository;
        private readonly IRepository<Diagonosis> _diagonosisRepository;

        public SettingService(IRepository<Prosthesis_Type> prosthesisTypeRepository, IRepository<Diagonosis> diagonosisRepository)
        {
            _prosthesisTypeRepository = prosthesisTypeRepository;
            _diagonosisRepository = diagonosisRepository;
        }

        public List<Prosthesis_Type> GetAllProsthesisType()
        {
            var prosthesisTypeList = _prosthesisTypeRepository.GetAll().OrderByDescending(x=>x.Id).ToList();
            return prosthesisTypeList;
        }

        public Prosthesis_Type GetProsthesisType(int id)
        {
            var prosthesisType = _prosthesisTypeRepository.Get(id);
            return prosthesisType;
        }
        public void CreateProsthesisType(Prosthesis_Type prosthesis)
        {
            var prosthesisType = _prosthesisTypeRepository.GetAll().Where(x => x.Name == prosthesis.Name).FirstOrDefault();
            if (prosthesisType==null)
            {
                _prosthesisTypeRepository.Insert(prosthesis);
            }
            else
            {
                throw new Exception("name is already exist.");
            }

        }

        public void UpdateProsthesisType(Prosthesis_Type prosthesis)
        {
            var prosthesisType = _prosthesisTypeRepository.GetAll().ToList().Where(x => x.Name == prosthesis.Name && x.Id != prosthesis.Id).FirstOrDefault();
            if (prosthesisType==null)
            {
                _prosthesisTypeRepository.Update(prosthesis);
            }
            else
            {
                throw new Exception("name is already exist.");
            }
            
        }

        public void DeleteProsthesisType(long id)
        {
            var prosthesisType = _prosthesisTypeRepository.Get(id);
            _prosthesisTypeRepository.Delete(prosthesisType);
        }

        public List<Diagonosis> GetAllDiagonosis()
        {
            var diagonosisList = _diagonosisRepository.GetAll().ToList();
            return diagonosisList;
        }

        public Diagonosis GetDiagonosis(int id)
        {
            var diagonosis = _diagonosisRepository.Get(id);
            return diagonosis;
        }
        public void CreateDiagonosis(Diagonosis diagonosis)
        {
            _diagonosisRepository.Insert(diagonosis);
        }

        public void UpdateDiagonosis(Diagonosis diagonosis)
        {
            _diagonosisRepository.Insert(diagonosis);
        }

        public void DeleteDiagonosis(long id)
        {
            var diagonosis = _diagonosisRepository.Get(id);
            _diagonosisRepository.Delete(diagonosis);
        }
    }
}
