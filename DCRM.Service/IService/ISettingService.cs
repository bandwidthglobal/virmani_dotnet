using DCRM.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface ISettingService
    {
        void CreateProsthesisType(Prosthesis_Type prosthesis);

        void UpdateProsthesisType(Prosthesis_Type prosthesis);

        void DeleteProsthesisType(long id);
    }
}
