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
    public class FileService:IFileService
    {
        private readonly IFileRepository _fileRepository;
        public FileService(IFileRepository fileRepository)
        {
            _fileRepository = fileRepository;
        }
        public void UpdateFileUrl(long id, string url, string type)
        { 
          if (!string.IsNullOrEmpty(type)) {
                _fileRepository.UpdateFileUrl(id, url, type);
            }
        }
    }
}
