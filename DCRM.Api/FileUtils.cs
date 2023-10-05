using DCRM.Common;
using DCRM.Service.IService;
using Org.BouncyCastle.Utilities;
using System.Drawing;
using System.IO;

namespace DCRM.Api
{
    public class FileUtils
    {
        public FileUtils()
        {
            
          
        }
        public static string SaveFile(long id, string type, string imagestr,string rootDirectory)
        {
            string filePath = string.Empty;
            try
            {
               
                string directoryPath = rootDirectory + "/UploadImages/" + type + "/" + id;
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string imageName = "profile" + ".jpg";
                string imgPath = Path.Combine(directoryPath, imageName);
                byte[] imageBytes = Convert.FromBase64String(imagestr);
                File.WriteAllBytes(imgPath, imageBytes);
                filePath = type + "/" + id + "/" + imageName;
                return filePath;
            }
            catch (Exception ex)
            {
                return filePath;
            }
        }
    }
}