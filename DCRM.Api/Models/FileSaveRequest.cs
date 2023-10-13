namespace DCRM.Api.Models
{
    public class FileSaveRequest
    {
       public long Id { get; set; }
        public string Type { get; set; }
        public string Image { get; set; }
        public string RootDirectory { get; set; }
        public string BaseUrl { get; set; }
    }
}
