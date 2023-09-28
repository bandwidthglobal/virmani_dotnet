using DCRM.Common.Dto;
using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface ILabService
    {
        List<LabDataDto> GetLabDataList(long patientId);
    }
}
