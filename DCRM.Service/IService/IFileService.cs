using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IFileService
    {
        void UpdateFileUrl(long id,string url,string type);
    }
}
