using DCRM.Common;
using DCRM.Service.IService;
using Org.BouncyCastle.Utilities;
using System.Drawing;

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
               
                string directoryPath = _rootDirectory + type + "/" + id;
                if (Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                byte[] bytes = Convert.FromBase64String(imagestr);
                using (MemoryStream ms = new MemoryStream(bytes))
                {
                    Image pic = Image.FromStream(ms);
                    pic.Save(directoryPath);
                    filePath = directoryPath + "/" + pic;
                }
               
                return filePath;
            }
            catch (Exception ex)
            {
                return filePath;
            }
        }
    }
}