using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;

namespace DCRM.Service.Service
{
    public class DealerService : IDealerService
    {
        public readonly IDealerRepository _dealerRepository;
        public DealerService(IDealerRepository dealerRepository)
        {
            _dealerRepository = dealerRepository;
        }

        /// <summary>
        /// get all dealers 
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<DealerDto>> GetAllAsync(long userId)
        {
            var dealers =await _dealerRepository.GetDealersAsync(userId);
            List<DealerDto> dealerList = new List<DealerDto>();
            DealerDto dealerDto;
            foreach (var dealer in dealers.ToList())
            {

                dealerDto = new DealerDto();
                dealerDto.Id = dealer.Id;
                dealerDto.User_Id = dealer.User_Id;
                dealerDto.Company_Name = dealer.Company_Name;
                dealerDto.OwnName_1 = dealer.Own_Name_1;
                dealerDto.OwnName_2 = dealer.Own_Name_2;
                dealerDto.Phone1 = dealer.Phone1;
                dealerDto.Phone2 = dealer.Phone2;
                dealerDto.Email1 = dealer.Email1;
                dealerDto.Email2 = dealer.Email2;
                dealerDto.Address_R = dealer.Address_R;
                dealerDto.Address_O = dealer.Address_O;
                dealerDto.City_R = dealer.City_R;
                dealerDto.City_O = dealer.City_O;
                dealerDto.Zip_R = dealer.Zip_R;
                dealerDto.Zip_O = dealer.Zip_O;
                dealerDto.Country_O = dealer.Country_O;
                dealerDto.Country_R = dealer.Country_R;
                dealerDto.Staff_Name1 = dealer.Staff_Name1;
                dealerDto.Staff_Name2 = dealer.Staff_Name2;
                dealerDto.Staff_Name3 = dealer.Staff_Name3;
                dealerDto.Staff_Name4 = dealer.Staff_Name4;
                dealerDto.Staff_Email1 = dealer.Staff_Email1;
                dealerDto.Staff_Email2 = dealer.Staff_Email2;
                dealerDto.Staff_Email3 = dealer.Staff_Email3;
                dealerDto.Staff_Email4 = dealer.Staff_Email4;
                dealerDto.Staff_Phone1 = dealer.Staff_Phone1;
                dealerDto.Staff_Phone2 = dealer.Staff_Phone2;
                dealerDto.Staff_Phone3 = dealer.Staff_Phone3;
                dealerDto.Staff_Phone4 = dealer.Staff_Phone4;
                dealerDto.Image = dealer.Image;
                dealerDto.Gst_Number = dealer.Gst_Number;
                dealerDto.Pan_Number = dealer.Pan_Number;
                dealerDto.Updated_At = dealer.Created_At;
                dealerDto.Created_At = dealer.Updated_At;
                dealerDto.DealerBankDetailList = _dealerRepository.GetDealerBankDetailDetailList(dealer.Id);
                dealerDto.DealerMaterialList = _dealerRepository.GetDealerMaterialDetailList(dealer.Id);
                dealerList.Add(dealerDto);
            }
            return dealerList;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<DealerDto> GetByIdAsync(long userId, int id)
        {

            Dealer dealer = await _dealerRepository.GetDealerByIdAsync(userId,id);
            DealerDto dealerDto = new DealerDto();
            if (dealer != null)
            {
                dealerDto.Id = dealer.Id;
                dealerDto.User_Id = dealer.User_Id;
                dealerDto.Company_Name = dealer.Company_Name;
                dealerDto.OwnName_1 = dealer.Own_Name_1;
                dealerDto.OwnName_2 = dealer.Own_Name_2;
                dealerDto.Phone1 = dealer.Phone1;
                dealerDto.Phone2 = dealer.Phone2;
                dealerDto.Email1 = dealer.Email1;
                dealerDto.Email2 = dealer.Email2;
                dealerDto.Address_R = dealer.Address_R;
                dealerDto.Address_O = dealer.Address_O;
                dealerDto.City_R = dealer.City_R;
                dealerDto.City_O = dealer.City_O;
                dealerDto.Zip_R = dealer.Zip_R;
                dealerDto.Zip_O = dealer.Zip_O;
                dealerDto.Country_O = dealer.Country_O;
                dealerDto.Country_R = dealer.Country_R;
                dealerDto.Staff_Name1 = dealer.Staff_Name1;
                dealerDto.Staff_Name2 = dealer.Staff_Name2;
                dealerDto.Staff_Name3 = dealer.Staff_Name3;
                dealerDto.Staff_Name4 = dealer.Staff_Name4;
                dealerDto.Staff_Email1 = dealer.Staff_Email1;
                dealerDto.Staff_Email2 = dealer.Staff_Email2;
                dealerDto.Staff_Email3 = dealer.Staff_Email3;
                dealerDto.Staff_Email4 = dealer.Staff_Email4;
                dealerDto.Staff_Phone1 = dealer.Staff_Phone1;
                dealerDto.Staff_Phone2 = dealer.Staff_Phone2;
                dealerDto.Staff_Phone3 = dealer.Staff_Phone3;
                dealerDto.Staff_Phone4 = dealer.Staff_Phone4;
                dealerDto.Image = dealer.Image;
                dealerDto.Gst_Number = dealer.Gst_Number;
                dealerDto.Pan_Number = dealer.Pan_Number;
                dealerDto.Updated_At = dealer.Created_At;
                dealerDto.Created_At = dealer.Updated_At;
                dealerDto.DealerBankDetailList = _dealerRepository.GetDealerBankDetailDetailList(dealer.Id);
                dealerDto.DealerMaterialList = _dealerRepository.GetDealerMaterialDetailList(dealer.Id);
            }
            return dealerDto;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task CreateAsync(DealerRequest request)
        {
            await _dealerRepository.CreateDealerAsync(request);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        public void Update(DealerRequest request)
        {
            _dealerRepository.UpdateDealer(request);
        }
        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync(long userId, int id)
        {
            await _dealerRepository.DeleteDealerAsync(userId, id);
        }

        /// <summary>
        /// get dealers by user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task <List<DealerDto>> GetByUserId(int userId)
        {
            var dealers =  _dealerRepository.GetDealerByUserId(userId);
            List<DealerDto> dealerList = new List<DealerDto>();
            DealerDto dealerDto;
            foreach (var dealer in dealers)
            {
                dealerDto=new DealerDto();
                dealerDto.Id = dealer.Id;
                dealerDto.User_Id = dealer.User_Id;
                dealerDto.Company_Name = dealer.Company_Name;
                dealerDto.OwnName_1 = dealer.Own_Name_1;
                dealerDto.OwnName_2 = dealer.Own_Name_2;
                dealerDto.Phone1 = dealer.Phone1;
                dealerDto.Phone2 = dealer.Phone2;
                dealerDto.Email1 = dealer.Email1;
                dealerDto.Email2 = dealer.Email2;
                dealerDto.Address_R = dealer.Address_R;
                dealerDto.Address_O = dealer.Address_O;
                dealerDto.City_R = dealer.City_R;
                dealerDto.City_O = dealer.City_O;
                dealerDto.Zip_R = dealer.Zip_R;
                dealerDto.Zip_O = dealer.Zip_O;
                dealerDto.Country_O = dealer.Country_O;
                dealerDto.Country_R = dealer.Country_R;
                dealerDto.Staff_Name1 = dealer.Staff_Name1;
                dealerDto.Staff_Name2 = dealer.Staff_Name2;
                dealerDto.Staff_Name3 = dealer.Staff_Name3;
                dealerDto.Staff_Name4 = dealer.Staff_Name4;
                dealerDto.Staff_Email1 = dealer.Staff_Email1;
                dealerDto.Staff_Email2 = dealer.Staff_Email2;
                dealerDto.Staff_Email3 = dealer.Staff_Email3;
                dealerDto.Staff_Email4 = dealer.Staff_Email4;
                dealerDto.Staff_Phone1 = dealer.Staff_Phone1;
                dealerDto.Staff_Phone2 = dealer.Staff_Phone2;
                dealerDto.Staff_Phone3 = dealer.Staff_Phone3;
                dealerDto.Staff_Phone4 = dealer.Staff_Phone4;
                dealerDto.Image = dealer.Image;
                dealerDto.Gst_Number = dealer.Gst_Number;
                dealerDto.Pan_Number = dealer.Pan_Number;
                dealerDto.Updated_At = dealer.Created_At;
                dealerDto.Created_At = dealer.Updated_At;
                dealerDto.DealerBankDetailList = _dealerRepository.GetDealerBankDetailDetailList(dealer.Id);
                dealerDto.DealerMaterialList = _dealerRepository.GetDealerMaterialDetailList(dealer.Id);
                dealerList.Add(dealerDto);

            }
            return dealerList;
        }
       
    }
}