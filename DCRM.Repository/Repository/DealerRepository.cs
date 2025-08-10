using DCRM.Common.Entity;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using System.Data.SqlTypes;

namespace DCRM.Repository.Repository
{
    public class DealerRepository : IDealerRepository
    {

        public readonly DCRMDBContext _contex;
        public DealerRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public IEnumerable<Dealer> GetDealers(long userId)
        {
            IEnumerable<Dealer> dealers;
            dealers = _contex.Dealers.Where(x => x.Is_Deleted == 0 && x.User_Id == userId);
            if (dealers != null)
            {
                return dealers;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>

        public Dealer GetDealerById(int id)
        {
            Dealer dealer = _contex.Dealers.FirstOrDefault(x => x.Id == id && x.Is_Deleted == 0);
            if (dealer != null)
            {
                return dealer;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
        public Dealer  Get(int id)
        {
            Dealer dealer = _contex.Dealers.FirstOrDefault(x => x.Id == id && x.Is_Deleted == 0);
            if (dealer != null)
            {
                return dealer;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public List<Dealer> GetDealerByUserId(int userId)
        {
            List<Dealer> dealers = _contex.Dealers.Where(x => x.User_Id == userId && x.Is_Deleted == 0).ToList();
            if (dealers != null)
            {
                return dealers;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dealerId"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public List<DealerMaterial> GetDealerMaterialDetailList(int dealerId)
        {
            var dealerMaterials = _contex.Dealer_Material.Where(x => x.Dealer_Id == dealerId).ToList();
            if (dealerMaterials != null)
            {
                return dealerMaterials;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dealerId"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public List<DealerBankDetail> GetDealerBankDetailDetailList(int dealerId)
        {
            var bankDeatils = _contex.Dealer_Bank_Details.Where(x => x.Dealer_Id == dealerId).ToList();
            if (bankDeatils != null)
            {
                return bankDeatils;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public long Create(DealerRequest request)
        {
            var dealerDetails = _contex.Dealers.FirstOrDefault(x => x.Company_Name == request.Company_Name);
            if (dealerDetails == null)
            {
                try
                {

                    _contex.Database.BeginTransaction();
                    Dealer dealer = new()
                    {
                        User_Id = request.User_Id,
                        Company_Name = request.Company_Name,
                        Own_Name_1 = request.OwnName_1,
                        Own_Name_2 = request.OwnName_2 ?? "",
                        Phone1 = request.Phone1 ?? "",
                        Phone2 = request.Phone2 ?? "",
                        Email1 = request.Email1 ?? "",
                        Email2 = request.Email2 ?? "",
                        Address_R = request.Address_R,
                        Address_O = request.Address_O ?? "",
                        City_R = request.City_R,
                        City_O = request.City_O ?? "",
                        Zip_R = request.Zip_R,
                        Zip_O = request.Zip_O ?? "",
                        Country_O = request.Country_O ?? "",
                        Country_R = request.Country_R,
                        Staff_Name1 = request.StaffName_1 ?? "",
                        Staff_Name2 = request.StaffName_2 ?? "",
                        Staff_Name3 = request.StaffName_3 ?? "",
                        Staff_Name4 = request.StaffName_4 ?? "",
                        Staff_Email1 = request.StaffEmail_1 ?? "",
                        Staff_Email2 = request.StaffEmail_2 ?? "",
                        Staff_Email3 = request.StaffEmail_3 ?? "",
                        Staff_Email4 = request.StaffEmail_4 ?? "",
                        Staff_Phone1 = Convert.ToInt64(request.StaffPhone_1),
                        Staff_Phone2 = Convert.ToInt64(request.StaffPhone_2),
                        Staff_Phone3 = Convert.ToInt64(request.StaffPhone_3),
                        Staff_Phone4 = Convert.ToInt64(request.StaffPhone_4),
                        Image = request.Thumb ?? "",
                        Gst_Number = request.Gst_Number,
                        Pan_Number = request.Pan_Number,
                        Updated_At = System.DateTime.UtcNow,
                        Created_At = System.DateTime.UtcNow
                    };
                    _contex.Dealers.Add(dealer);
                    _contex.SaveChanges();

                    if (request.DealerBankDetailList != null && request.DealerBankDetailList.Count > 0)
                    {
                        foreach (var item in request.DealerBankDetailList)
                        {
                            item.Dealer_Id = dealer.Id;
                            _contex.Dealer_Bank_Details.Add(item);
                            _contex.SaveChanges();
                        }
                    }
                    if (request.DealerMaterialList != null && request.DealerMaterialList.Count > 0)
                    {
                        foreach (var item in request.DealerMaterialList)
                        {
                            item.Dealer_Id = dealer.Id;
                            _contex.Dealer_Material.Add(item);
                            _contex.SaveChanges();
                        }
                    }
                    _contex.Database.CommitTransaction();
                    return dealer.Id;

                }
                catch (Exception ex)
                {
                    _contex.Database.RollbackTransaction();
                    throw new Exception(ex.Message);
                }
            }
            else
            {
                throw new SqlAlreadyFilledException("companyname already exist");
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public void Delete(long id)
        {
            var dealerDetails = _contex.Dealers.FirstOrDefault(x => x.Id == id);
            if (dealerDetails != null)
            {
                dealerDetails.Is_Deleted = 1;
                _contex.Dealers.Update(dealerDetails);
                _contex.SaveChanges();
            }
            //else { throw new KeyNotFoundException("no record found"); }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void UpdateDealer(DealerRequest request)
        {
            try
            {
                var dealer = _contex.Dealers.FirstOrDefault(x => x.Id == request.Id);
                if (dealer != null)
                {


                    //Dealer dealer = new Dealer();
                    dealer.User_Id = request.User_Id;
                    dealer.Company_Name = request.Company_Name;
                    dealer.Own_Name_1 = request.OwnName_1;
                    dealer.Own_Name_2 = request.OwnName_2;
                    dealer.Phone1 = request.Phone1;
                    dealer.Phone2 = request.Phone2;
                    dealer.Email1 = request.Email1;
                    dealer.Email2 = request.Email2;
                    dealer.Address_R = request.Address_R;
                    dealer.Address_O = request.Address_O;
                    dealer.City_R = request.City_R;
                    dealer.City_O = request.City_O;
                    dealer.Zip_R = request.Zip_R;
                    dealer.Zip_O = request.Zip_O;
                    dealer.Country_O = request.Country_O;
                    dealer.Country_R = request.Country_R;
                    dealer.Staff_Name1 = request.StaffName_1 ?? "";
                    dealer.Staff_Name2 = request.StaffName_2 ?? "";
                    dealer.Staff_Name3 = request.StaffName_3 ?? "";
                    dealer.Staff_Name4 = request.StaffName_4 ?? "";
                    dealer.Staff_Email1 = request.StaffEmail_1 ?? "";
                    dealer.Staff_Email2 = request.StaffEmail_2 ?? "";
                    dealer.Staff_Email3 = request.StaffEmail_3 ?? "";
                    dealer.Staff_Email4 = request.StaffEmail_4 ?? "";
                    dealer.Staff_Phone1 = Convert.ToInt64(request.StaffPhone_1);
                    dealer.Staff_Phone2 = Convert.ToInt64(request.StaffPhone_2);
                    dealer.Staff_Phone3 = Convert.ToInt64(request.StaffPhone_3);
                    dealer.Staff_Phone4 = Convert.ToInt64(request.StaffPhone_4);
                    dealer.Image = request.Thumb;
                    dealer.Gst_Number = request.Gst_Number;
                    dealer.Pan_Number = request.Pan_Number;
                    dealer.Updated_At = System.DateTime.UtcNow;
                    dealer.Created_At = System.DateTime.UtcNow;
                    _contex.Dealers.Update(dealer);
                    _contex.SaveChanges();

                    if (request.DealerBankDetailList != null && request.DealerBankDetailList.Count > 0)
                    {


                        foreach (var item in request.DealerBankDetailList)
                        {
                            var bankDetails = _contex.Dealer_Bank_Details.FirstOrDefault(x => x.Id == item.Id);
                            if (bankDetails == null)
                            {
                                item.Dealer_Id = dealer.Id;
                                _contex.Dealer_Bank_Details.Add(item);

                            }
                            else
                            {
                                bankDetails.Bank_Name = item.Bank_Name;
                                bankDetails.Bank_Account_Number = item.Bank_Account_Number;
                                bankDetails.Ifsc_Code = item.Ifsc_Code;
                                bankDetails.Remarks = item.Remarks;
                                bankDetails.Updated_At = System.DateTime.UtcNow;
                                _contex.Dealer_Bank_Details.Update(bankDetails);
                            }
                            _contex.SaveChanges();
                        }


                    }
                    if (request.DealerMaterialList != null && request.DealerMaterialList.Count > 0)
                    {
                        foreach (var item in request.DealerMaterialList)
                        {
                            var materialDetails = _contex.Dealer_Material.FirstOrDefault(x => x.Id == item.Id);
                            if (materialDetails == null)
                            {
                                item.Dealer_Id = dealer.Id;
                                _contex.Dealer_Material.Add(item);

                            }
                            else
                            {
                                materialDetails.Material_Date = item.Material_Date;
                                materialDetails.Material_Cost = item.Material_Cost;
                                materialDetails.Material_Name = item.Material_Name;
                                _contex.Dealer_Material.Update(materialDetails);
                            }
                            _contex.SaveChanges();

                        }
                    }


                }
                else
                {
                    throw new SqlAlreadyFilledException("companyname already exist");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}