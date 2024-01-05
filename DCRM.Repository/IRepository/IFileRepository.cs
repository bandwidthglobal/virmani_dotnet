namespace DCRM.Repository.IRepository
{
    public interface IFileRepository
    {
        void UpdateFileUrl(long id, string url, string type);
    }
}
