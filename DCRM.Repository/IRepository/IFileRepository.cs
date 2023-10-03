using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.IRepository
{
    public interface IFileRepository
    {
        void UpdateFileUrl(long id, string url, string type);
    }
}
