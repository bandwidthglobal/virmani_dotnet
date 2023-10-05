using DCRM.Common;
using DCRM.Service.IService;
using Org.BouncyCastle.Utilities;
using System.Drawing;
using System.IO;

namespace DCRM.Api
{
    public class FileUtils
    {
        public  static  string _rootDirectory = string.Empty;
      
        public FileUtils(IWebHostEnvironment env)
        {
            _rootDirectory = env.ContentRootPath;
          
        }
        public static string SaveFile(long id, string type, string imagestr)
        {
            string filePath = string.Empty;
            try
            {
               
                string directoryPath = _rootDirectory+ "/UploadImages" + type + "/" + id;
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string imageName = "profile" + ".jpg";
                string imgPath = Path.Combine(directoryPath, imageName);
                byte[] imageBytes = Convert.FromBase64String(imagestr);
                File.WriteAllBytes(imgPath, imageBytes);
                filePath = directoryPath + "/" + imageName;
                return filePath;
            }
            catch (Exception ex)
            {
                return filePath;
            }
        }
    }
}