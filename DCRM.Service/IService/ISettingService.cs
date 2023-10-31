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
        List<Prosthesis_Type> GetAllProsthesisType();

        Prosthesis_Type GetProsthesisType(int id);
        void CreateProsthesisType(Prosthesis_Type prosthesis);

        void UpdateProsthesisType(Prosthesis_Type prosthesis);

        void DeleteProsthesisType(long id);

        List<Diagonosis> GetAllDiagonosis();

        Diagonosis GetDiagonosis(int id);


        void CreateDiagonosis(Diagonosis diagonosis);


        void UpdateDiagonosis(Diagonosis diagonosis);


        void DeleteDiagonosis(long id);
    }
}
