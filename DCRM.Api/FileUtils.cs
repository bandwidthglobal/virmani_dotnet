using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Service.IService;
using Org.BouncyCastle.Utilities;
using System.Drawing;
using System.IO;

namespace DCRM.Api
{
    public class FileUtils
    {

        public string baseUrl = string.Empty;
        public FileUtils()
        {

        }

        // public string SaveFile(long id, string type, string imagestr, string rootDirectory,)
        public static string SaveFile(FileSaveRequest fileSaveRequest)
        {
            string filePath = string.Empty;
            if (string.IsNullOrEmpty(fileSaveRequest.Image))
            {
                return filePath;
            }
            try
            {
                var thumb = fileSaveRequest.Image.Split(',');
                if (thumb.Length > 1)
                {
                    fileSaveRequest.Image = thumb[1];
                }
                else
                {
                    fileSaveRequest.Image = thumb[0];
                }
                string directoryPath = fileSaveRequest.RootDirectory + "/UploadImages/" + fileSaveRequest.Type + "/" + fileSaveRequest.Id;
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                string imageName = "profile" + ".jpg";
                string imgPath = Path.Combine(directoryPath, imageName);
                byte[] imageBytes = Convert.FromBase64String(fileSaveRequest.Image);
                File.WriteAllBytes(imgPath, imageBytes);
                filePath = fileSaveRequest.BaseUrl + "UploadImages/" + fileSaveRequest.Type + "/" + fileSaveRequest.Id + "/" + imageName;
                return filePath;
            }
            catch (Exception ex)
            {
                return filePath;
            }
        }
    }
}