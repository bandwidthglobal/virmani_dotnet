using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace DCRM.Common
{
    public static class Utility
    {
        public static byte[] Base64ToImage(string imagestr)
        {
            byte[] bytes = Convert.FromBase64String(imagestr);
            return bytes;
        }
    }
}
