using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Data.SqlTypes;

namespace DCRM.Repository.Repository
{
    public class StaffRepository : IStaffRepository
    {

        public readonly DCRMDBContext _contex;
        public StaffRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        /// <summary>
        /// User authenticate and return token for other request
        /// </summary>
        /// <param name="authenticateRequest"></param>
        /// <returns></returns>
        public async Task<Staff> AuthenticateAsync(AuthenticateRequest authenticateRequest)
        {
            var Staff = await _contex.Staffs.SingleOrDefaultAsync(x => x.Status == 1 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);

            return Staff;

        }

        /// <summary>
        /// ftech all  active staffs
        /// </summary>
        /// <returns></returns>

        public IEnumerable<Staff> GetAll()
        {

            IEnumerable<Staff> staffs = _contex.Staffs.Where(x => x.Is_Deleted == 0);
            return staffs;
        }

        /// <summary>
        /// fetch staff by staff id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Staff Get(int id)
        {
            Staff staff = _contex.Staffs.FirstOrDefault(x => x.Id == id);
            return staff;
        }

        /// <summary>
        /// create staff by logged user
        /// </summary>
        /// <param name="staff"></param>
        /// <returns></returns>
        /// <exception cref="SqlAlreadyFilledException"></exception>
        /// <exception cref="Exception"></exception>
        public long Create(StaffRequest staffRequest)
        {
           
                var staffDetails = _contex.Staffs.FirstOrDefault(x => x.Email == staffRequest.Email);
                if (staffDetails == null)
                {
                    try
                    {
                        _contex.Database.BeginTransaction();
                        Staff staff = new Staff();
                        staff.User_Id = staffRequest.User_Id;
                        staff.Name = staffRequest.Name;
                        staff.Email = staffRequest.Email;
                        staff.Father = staffRequest.Father;
                        staff.Department = staffRequest.Department;
                        staff.Designation = staffRequest.Designation;
                        staff.Mother = staffRequest.Mother;
                        staff.Gender = staffRequest.Gender;
                        staff.Blood_Group = staffRequest.Blood_Group;
                        staff.Marital_Status = staffRequest.Marital_Status;
                        staff.Date_Of_Joining = staffRequest.Date_Of_Joining;
                        staff.Dob = staffRequest.Dob;
                        staff.Phone = staffRequest.Phone;
                        staff.Gst = staffRequest.Gst;
                        staff.Pan = staffRequest.Pan;
                        staff.Thumb = staffRequest.Thumb;
                        staff.Password = staffRequest.Password;
                        staff.Qualification = staffRequest.Qualification;
                        staff.Work_Experience = staffRequest.Work_Experience;
                        staff.Specialization = staffRequest.Specialization;
                        staff.Note = staffRequest.Note;
                        staff.Permanent_Address = staffRequest.Permanent_Address;
                        staff.Current_Address = staffRequest.Current_Address;
                        staff.Is_Deleted = 0;
                        staff.Status = 1;
                        staff.Created_At = System.DateTime.UtcNow;
                        _contex.Staffs.Add(staff);
                        _contex.SaveChanges();
                        if (staffRequest.StaffInsuranceDetail != null && staffRequest.StaffInsuranceDetail.Count > 0)
                        {
                            foreach (var item in staffRequest.StaffInsuranceDetail)
                            {
                                item.Staff_Id = staff.Id;
                                _contex.Staff_Insurance_Details.Add(item);
                                _contex.SaveChanges();
                            }
                        }
                        if (staffRequest.StaffBankDetail != null && staffRequest.StaffBankDetail.Count > 0)
                        {
                            foreach (var item in staffRequest.StaffBankDetail)
                            {
                                item.Staff_Id = staff.Id;
                                _contex.Staff_Bank_Details.Add(item);
                                _contex.SaveChanges();
                            }
                        }
                        if (staffRequest.StaffVaccination != null && staffRequest.StaffVaccination.Count > 0)
                        {
                            foreach (var item in staffRequest.StaffVaccination)
                            {
                                item.Staff_Id = staff.Id;
                                _contex.Staff_Vaccination.Add(item);
                                _contex.SaveChanges();
                            }
                        }
                        _contex.Database.CommitTransaction();

                        return staff.Id;
                    }
                    catch (Exception ex)
                    {
                        _contex.Database.RollbackTransaction();
                        throw new Exception(ex.Message);
                    }
                }
                else
                {
                    throw new SqlAlreadyFilledException("staff already exist");
                }

        }


        /// <summary>
        /// update satff 
        /// </summary>
        /// <param name="staff"></param>
        /// <returns></returns>
        public void Update(StaffRequest staffRequest)
        {
           
                var staff = _contex.Staffs.AsNoTracking().FirstOrDefault(x => x.Id == staffRequest.Id);
                if (staff != null)
                {
                    staff.Id = staffRequest.Id;
                    staff.User_Id = staffRequest.User_Id;
                    staff.Name = staffRequest.Name;
                    staff.Email = staffRequest.Email;
                    staff.Father = staffRequest.Father;
                    staff.Department = staffRequest.Department;
                    staff.Designation = staffRequest.Designation;
                    staff.Mother = staffRequest.Mother;
                    staff.Gender = staffRequest.Gender;
                    staff.Blood_Group = staffRequest.Blood_Group;
                    staff.Marital_Status = staffRequest.Marital_Status;
                    staff.Date_Of_Joining = staffRequest.Date_Of_Joining;
                    staff.Dob = staffRequest.Dob;
                    staff.Phone = staffRequest.Phone;
                    staff.Gst = staffRequest.Gst;
                    staff.Pan = staffRequest.Pan;
                    staff.Thumb = staffRequest.Thumb;
                    staff.Qualification = staffRequest.Qualification;
                    staff.Work_Experience = staffRequest.Work_Experience;
                    staff.Specialization = staffRequest.Specialization;
                    staff.Note = staffRequest.Note;
                    staff.Permanent_Address = staffRequest.Permanent_Address;
                    staff.Current_Address = staffRequest.Current_Address;
                    staff.Created_At = System.DateTime.UtcNow;
                    _contex.Staffs.Update(staff);
                    _contex.SaveChanges();
                    if (staffRequest.StaffInsuranceDetail != null && staffRequest.StaffInsuranceDetail.Count > 0)
                    {
                        foreach (var item in staffRequest.StaffInsuranceDetail)
                        {
                            var insurance = _contex.Staff_Insurance_Details.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                            if (insurance == null)
                            {
                                item.Staff_Id = staff.Id;
                                _contex.Staff_Insurance_Details.Add(item);
                            }
                            else
                            {
                                insurance.Insurance_Date = item.Insurance_Date;
                                insurance.Insurance = item.Insurance;
                                insurance.Renewal_Date = item.Renewal_Date;
                                insurance.Amount_Insured = item.Amount_Insured;
                                insurance.Amount_Paid = item.Amount_Paid;
                                insurance.Allow_Notifications = item.Allow_Notifications;
                                insurance.Remarks = item.Remarks;
                                insurance.Updated_At = System.DateTime.UtcNow;
                                _contex.Staff_Insurance_Details.Update(item);
                            }
                            _contex.SaveChanges();
                        }
                    }
                    if (staffRequest.StaffBankDetail != null && staffRequest.StaffBankDetail.Count > 0)
                    {
                        foreach (var item in staffRequest.StaffBankDetail)
                        {
                            var bankDetails = _contex.Staff_Bank_Details.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                            if (bankDetails == null)
                            {
                                item.Staff_Id = staff.Id;
                                _contex.Staff_Bank_Details.Add(item);
                            }
                            else
                            {
                                bankDetails.Remarks = item.Remarks;
                                bankDetails.Bank_Account_Number = item.Bank_Account_Number;
                                bankDetails.Bank_Name = item.Bank_Name;
                                bankDetails.Ifsc_Code = item.Ifsc_Code;
                                bankDetails.Remarks = item.Remarks;
                                bankDetails.Updated_At = System.DateTime.UtcNow;
                                _contex.Staff_Bank_Details.Update(item);
                            }

                            _contex.SaveChanges();
                        }
                    }
                    if (staffRequest.StaffVaccination != null && staffRequest.StaffVaccination.Count > 0)
                    {
                        foreach (var item in staffRequest.StaffVaccination)
                        {
                            var vaccinationDetails = _contex.Staff_Vaccination.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                            if (vaccinationDetails == null)
                            {
                                item.Staff_Id = staff.Id;
                                _contex.Staff_Vaccination.Add(item);
                            }
                            else
                            {
                                vaccinationDetails.Remarks = item.Remarks;
                                vaccinationDetails.Vaccination_Date = item.Vaccination_Date;
                                vaccinationDetails.Reminder_Date_For_Next = item.Reminder_Date_For_Next;
                                vaccinationDetails.Vaccination_Type = item.Vaccination_Type;
                                vaccinationDetails.Medical_History = item.Medical_History;
                                vaccinationDetails.Updated_At = System.DateTime.UtcNow;
                                _contex.Staff_Vaccination.Update(item);
                            }
                            _contex.SaveChanges();
                        }
                    }
                }
                else
                {
                    throw new SqlAlreadyFilledException("no data found");

                }
        }

        /// <summary>
        /// remove staff by staff id from staffs table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public  void Delete(int id)
        {
            Staff? staff = _contex.Staffs.Where(x => x.Id == id).FirstOrDefault();
            if (staff != null)
            {
                staff.Is_Deleted = 1;
                _contex.Update(staff);
                _contex.SaveChanges();
            }

        }

        /// <summary>
        /// password change according user type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangeStaffPasswordAsync(ChangePasswordRequest changePasswordModel)
        {

            if (changePasswordModel.Type.ToLower() == "staff")
            {
                var staff = await _contex.Staffs.FirstOrDefaultAsync(x => x.Id == changePasswordModel.Id);
                if (staff != null)
                {
                    staff.Password = changePasswordModel.NewPassword;
                    _contex.Update(staff);
                    await _contex.SaveChangesAsync();
                }
                else { throw new KeyNotFoundException("staff is not found"); }
            }



        }

        /// <summary>
        /// get staff list by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Staff> GetStaffsByUserId(int userId)
        {
            var staffList = _contex.Staffs.Where(x => x.User_Id == userId).ToList();
            return staffList;
        }
        /// <summary>
        /// get satff isnsurance list by staff id
        /// </summary>
        /// <param name="staffId"></param>
        /// <returns></returns>
        public List<StaffInsuranceDetail> GetStaffInsuranceDetailList(int staffId)
        {
            List<StaffInsuranceDetail> insuranceList = _contex.Staff_Insurance_Details.Where(x => x.Staff_Id == staffId).ToList();
            return insuranceList;
        }

        /// <summary>
        /// get satf bank details list by staff id
        /// </summary>
        /// <param name="staffId"></param>
        /// <returns></returns>
        public List<StaffBankDetail> GetStaffBankDetailList(int staffId)
        {
            List<StaffBankDetail> staffBankDetailList = _contex.Staff_Bank_Details.Where(x => x.Staff_Id == staffId).ToList();
            return staffBankDetailList;
        }

        /// <summary>
        /// get satff vaccination by staff id
        /// </summary>
        /// <param name="staffId"></param>
        /// <returns></returns>
        public List<StaffVaccination> GetStaffVaccinationList(int staffId)
        {
            List<StaffVaccination> vaccinationList = _contex.Staff_Vaccination.Where(x => x.Staff_Id == staffId).ToList();
            return vaccinationList;
        }
    }
}