using DCRM.Common;
using Org.BouncyCastle.Utilities;
using System.Drawing;

namespace DCRM.Api
{
    public class FileUtils
    {
        string _rootDirectory = string.Empty;
        public FileUtils(IWebHostEnvironment env)
        {
            _rootDirectory = env.ContentRootPath;
        }
        public string SaveFile(long id, string type, string imagestr)
        {
            try
            {
                string filePath=string.Empty;
                string directoryPath = _rootDirectory + "type/" + id;
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
                throw new Exception(ex.Message);
            }
        }
    }
}