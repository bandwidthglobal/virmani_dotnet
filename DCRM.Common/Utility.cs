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
