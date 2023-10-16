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

        public SettingService(IRepository<Prosthesis_Type> prosthesisTypeRepository)
        {
            _prosthesisTypeRepository = prosthesisTypeRepository;
        }
        public void CreateProsthesisType(Prosthesis_Type prosthesis)
        {
            _prosthesisTypeRepository.Insert(prosthesis);
        }

        public void UpdateProsthesisType(Prosthesis_Type prosthesis)
        {
            _prosthesisTypeRepository.Insert(prosthesis);
        }

        public void DeleteProsthesisType(long id)
        {
            var prosthesisType = _prosthesisTypeRepository.Get(id);
            _prosthesisTypeRepository.Insert(prosthesisType);
        }
    }
}
