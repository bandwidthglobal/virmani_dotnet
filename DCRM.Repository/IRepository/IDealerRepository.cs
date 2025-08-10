using DCRM.Common.Entity;

namespace DCRM.Repository.IRepository
{
    public interface IDealerRepository
    {
       
        IEnumerable<Dealer> GetDealers(long userId);

        Dealer Get( int id);
        Dealer GetDealerById(int id);

        List<Dealer> GetDealerByUserId(int userId);

        List<DealerBankDetail> GetDealerBankDetailDetailList(int dealerId);

        List<DealerMaterial> GetDealerMaterialDetailList(int dealerId);

        long Create(DealerRequest request);

        void UpdateDealer(DealerRequest request);

        void Delete(long id);



    } 
}
