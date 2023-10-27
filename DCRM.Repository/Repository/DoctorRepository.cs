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
    public class DoctorRepository : IDoctorRepository
    {

        public readonly DCRMDBContext _contex;
        public DoctorRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        /// <summary>
        /// doctor authenticate and return doctor details
        /// </summary>
        /// <param name="authenticateRequest"></param>
        /// <returns></returns>
        public async Task<Doctor> AuthenticateAsync(AuthenticateRequest authenticateRequest)
        {
            var doctor = await _contex.Doctors.SingleOrDefaultAsync(x => x.Is_Delete == 0 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);

            return doctor;

        }

        /// <summary>
        /// ftech all  active doctors
        /// </summary>
        /// <returns></returns>

        public IEnumerable<Doctor> GetAll()
        {
            IEnumerable<Doctor> doctors = _contex.Doctors.Where(x => x.Is_Delete == 0).OrderByDescending(x => x.Id);
            return doctors;
        }

        /// <summary>
        /// fetch staff by staff id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Doctor Get(long id)
        {
            Doctor? doctor = _contex.Doctors.FirstOrDefault(x => x.Id == id);
            return doctor;
        }

        /// <summary>
        /// create doctor
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="SqlAlreadyFilledException"></exception>
        /// <exception cref="Exception"></exception>
        public void Create(DoctorRequest request)
        {

            try
            {
                var doctorDetails = _contex.Doctors.FirstOrDefault(x => x.Email == request.Email);
                if (doctorDetails == null)
                {
                    try
                    {
                        _contex.Database.BeginTransaction();
                        Doctor doctor = new Doctor();
                        doctor.User_Id = request.User_Id;
                        doctor.Name = request.Name;
                        doctor.Email = request.Email;
                        doctor.Thumb = request.Thumb;
                        doctor.Qualification = request.Qualification;
                        doctor.Age = request.Age;
                        doctor.Gender = request.Gender;
                        doctor.Blood_Group = request.Blood_Group;
                        doctor.Marital_Status = request.Marital_Status;
                        doctor.Dob = request.Dob;
                        doctor.Phone1 = request.Phone1;
                        doctor.Phone2 = request.Phone2;
                        doctor.Phone3 = request.Phone3;
                        doctor.Phone4 = request.Phone4;
                        doctor.Pan_Number = request.Pan_Number;
                        doctor.Password = request.Password;
                        doctor.Gst_Number = request.Gst_Number;
                        doctor.Speciality = request.Speciality;
                        doctor.Role = request.Role;
                        doctor.Is_Delete = 0;
                        doctor.Created_At = System.DateTime.UtcNow;
                        doctor.Updated_At = System.DateTime.UtcNow;
                        _contex.Doctors.Add(doctor);
                        _contex.SaveChanges();
                        if (request.DoctorInsuranceDetailList != null && request.DoctorInsuranceDetailList.Count > 0)
                        {
                            foreach (var item in request.DoctorInsuranceDetailList)
                            {
                                item.Doctor_Id = doctor.Id;
                                _contex.Doctor_Insurance_Details.Add(item);
                                _contex.SaveChanges();
                            }
                        }
                        if (request.DoctorBankDetailList != null && request.DoctorBankDetailList.Count > 0)
                        {
                            foreach (var item in request.DoctorBankDetailList)
                            {
                                item.Doctor_Id = doctor.Id;
                                _contex.Doctor_Bank_Details.Add(item);
                                _contex.SaveChanges();
                            }
                        }
                        if (request.DoctorsVaccinationList != null && request.DoctorsVaccinationList.Count > 0)
                        {
                            foreach (var item in request.DoctorsVaccinationList)
                            {
                                item.Doctor_Id = doctor.Id;
                                _contex.Doctors_Vaccination.Add(item);
                                _contex.SaveChanges();
                            }
                        }

                        if (request.DoctorsAddressList != null && request.DoctorsAddressList.Count > 0)
                        {
                            foreach (var item in request.DoctorsAddressList)
                            {
                                item.Doctor_Id = Convert.ToInt32(doctor.Id);
                                _contex.Doctors_Address.Add(item);
                                _contex.SaveChanges();
                            }
                        }
                        _contex.Database.CommitTransaction();
                    }
                    catch (Exception ex)
                    {
                        _contex.Database.RollbackTransaction();
                        throw new Exception(ex.Message);
                    }
                }
                else
                {
                    throw new SqlAlreadyFilledException("email is already exist");
                }


            }
            catch (Exception ex)
            {
                throw new Exception("some technical problem. Please contact to admin");
            }
        }


        /// <summary>
        /// update doctor 
        /// </summary>
        /// <param name="staff"></param>
        /// <returns></returns>
        public void Update(DoctorRequest request)
        {
           
                var doctor = _contex.Doctors.AsNoTracking().FirstOrDefault(x => x.Id == request.Id);
                if (doctor != null)
                {
                    doctor.User_Id = request.User_Id;
                    doctor.Name = request.Name;
                    doctor.Email = request.Email;
                    doctor.Thumb = request.Thumb;
                    doctor.Qualification = request.Qualification;
                    doctor.Age = request.Age;
                    doctor.Gender = request.Gender;
                    doctor.Blood_Group = request.Blood_Group;
                    doctor.Marital_Status = request.Marital_Status;
                    doctor.Dob = request.Dob;
                    doctor.Phone1 = request.Phone1;
                    doctor.Phone2 = request.Phone2;
                    doctor.Phone3 = request.Phone3;
                    doctor.Phone4 = request.Phone4;
                    doctor.Pan_Number = request.Pan_Number;
                    doctor.Gst_Number = request.Gst_Number;
                    doctor.Speciality = request.Speciality;
                    doctor.Role = request.Role;
                    doctor.Updated_At = System.DateTime.UtcNow;
                    _contex.Doctors.Update(doctor);
                    _contex.SaveChanges();
                    if (request.DoctorsAddressList != null && request.DoctorsAddressList.Count > 0)
                    {
                        foreach (var item in request.DoctorsAddressList)
                        {
                            var addressDetails = _contex.Doctors_Address.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                            if (addressDetails == null)
                            {
                                item.Doctor_Id = Convert.ToInt32(doctor.Id);
                                _contex.Doctors_Address.Add(item);
                            }
                            else
                            {
                                addressDetails.Address_Other = item.Address_Other;
                                addressDetails.Address_O = item.Address_O;
                                addressDetails.Address_R = item.Address_R;
                                addressDetails.City_O = item.City_O;
                                addressDetails.City_R = item.City_R;
                                addressDetails.City_Other = item.City_Other;
                                addressDetails.Country_O = item.Country_O;
                                addressDetails.Country_R = item.Country_R;
                                addressDetails.Country_Other = item.Country_Other;
                                addressDetails.Zip_Other = item.Zip_Other;
                                addressDetails.Zip_O = item.Zip_O;
                                addressDetails.Zip_R = item.Zip_R;
                                addressDetails.Updated_At = System.DateTime.UtcNow;
                                _contex.Doctors_Address.Update(addressDetails);
                            }
                            _contex.SaveChanges();
                        }
                    }
                    if (request.DoctorInsuranceDetailList != null && request.DoctorInsuranceDetailList.Count > 0)
                    {
                        foreach (var item in request.DoctorInsuranceDetailList)
                        {
                            var insurance = _contex.Doctor_Insurance_Details.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                            if (insurance == null)
                            {
                                item.Doctor_Id = doctor.Id;
                                _contex.Doctor_Insurance_Details.Add(item);
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
                                _contex.Doctor_Insurance_Details.Update(insurance);
                            }
                            _contex.SaveChanges();
                        }
                    }
                    if (request.DoctorBankDetailList != null && request.DoctorBankDetailList.Count > 0)
                    {
                        foreach (var item in request.DoctorBankDetailList)
                        {
                            var bankDetails = _contex.Doctor_Bank_Details.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                            if (bankDetails == null)
                            {
                                item.Doctor_Id = doctor.Id;
                                _contex.Doctor_Bank_Details.Add(item);
                            }
                            else
                            {
                                bankDetails.Remarks = item.Remarks;
                                bankDetails.Bank_Account_Number = item.Bank_Account_Number;
                                bankDetails.Bank_Name = item.Bank_Name;
                                bankDetails.Ifsc_Code = item.Ifsc_Code;
                                bankDetails.Remarks = item.Remarks;
                                bankDetails.Updated_At = System.DateTime.UtcNow;
                                _contex.Doctor_Bank_Details.Update(bankDetails);
                            }
                            _contex.SaveChanges();
                        }
                    }
                    if (request.DoctorsVaccinationList != null && request.DoctorsVaccinationList.Count > 0)
                    {
                        foreach (var item in request.DoctorsVaccinationList)
                        {
                            var vaccinationDetails = _contex.Doctors_Vaccination.AsNoTracking().FirstOrDefault(x => x.Id == item.Id);
                            if (vaccinationDetails == null)
                            {
                                item.Doctor_Id = doctor.Id;
                                _contex.Doctors_Vaccination.Add(item);
                                _contex.SaveChanges();
                            }
                            else
                            {
                                vaccinationDetails.Remarks = item.Remarks;
                                vaccinationDetails.Vaccination_Date = item.Vaccination_Date;
                                vaccinationDetails.Reminder_Date_For_Next = item.Reminder_Date_For_Next;
                                vaccinationDetails.Vaccination_Type = item.Vaccination_Type;
                                vaccinationDetails.Medical_History = item.Medical_History;
                                vaccinationDetails.Updated_At = System.DateTime.UtcNow;
                                _contex.Doctors_Vaccination.Update(item);
                                _contex.SaveChanges();
                            }

                        }
                    }


                }
                else
                {
                    throw new SqlAlreadyFilledException("no data found");

                }

           
        }
        /// <summary>
        /// get all doctor by userid
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<DropdownDataDto> NameList(long userId)
        {
            var doctors = _contex.Doctors.Where(x => x.User_Id == userId).ToList();
            DropdownDataDto data = new DropdownDataDto();
            List<DropdownDataDto> dataList = new List<DropdownDataDto>();
            foreach (var doctor in doctors)
            {
                data = new DropdownDataDto();
                data.Id = doctor.Id; data.Name = doctor.Name; dataList.Add(data);
            }
            return dataList;
        }
        /// <summary>
        /// remove staff by staff id from staffs table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public void Delete(long id)
        {
            var doctor = _contex.Doctors.FirstOrDefault(x => x.Id == id);
            if (doctor != null)
            {
                doctor.Is_Delete = 1;
                _contex.Update(doctor);
                _contex.SaveChanges();
            }

        }

        /// <summary>
        /// password change according user type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public void ChangePassword(ChangePasswordRequest changePasswordModel)
        {

            var doctor = _contex.Doctors.FirstOrDefault(x => x.Id == changePasswordModel.Id);
            if (doctor != null)
            {
                doctor.Password = changePasswordModel.NewPassword;
                _contex.Update(doctor);
                _contex.SaveChanges();
            }
            else { throw new KeyNotFoundException("staff is not found"); }

        }

        /// <summary>
        /// get staff list by user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Doctor> GetDoctorsByUserId(int userId)
        {
            var doctorList = _contex.Doctors.Where(x => x.User_Id == userId && x.Is_Delete == 0).ToList();
            return doctorList;
        }
        /// <summary>
        /// get doctor isnsurance list by staff id
        /// </summary>
        /// <param name="doctorId"></param>
        /// <returns></returns>
        public List<DoctorInsuranceDetail> GetDoctorInsuranceDetailList(int doctorId)
        {
            List<DoctorInsuranceDetail> insuranceList = _contex.Doctor_Insurance_Details.Where(x => x.Doctor_Id == doctorId).ToList();
            return insuranceList;
        }

        /// <summary>
        /// get doctor bank details list by staff id
        /// </summary>
        /// <param name="doctorId"></param>
        /// <returns></returns>
        public List<DoctorBankDetail> GetDoctorBankDetailList(int doctorId)
        {
            List<DoctorBankDetail> doctorBankDetailList = _contex.Doctor_Bank_Details.Where(x => x.Doctor_Id == doctorId).ToList();
            return doctorBankDetailList;
        }

        /// <summary>
        /// get satff vaccination by staff id
        /// </summary>
        /// <param name="doctorId"></param>
        /// <returns></returns>
        public List<DoctorsVaccination> GetDoctorVaccinationList(int doctorId)
        {
            List<DoctorsVaccination> vaccinationList = _contex.Doctors_Vaccination.Where(x => x.Doctor_Id == doctorId).ToList();
            return vaccinationList;
        }

        public List<DoctorsAddress> GetDoctorsAddressDetailList(int doctorId)
        {
            List<DoctorsAddress> doctorsAddressList = _contex.Doctors_Address.Where(x => x.Doctor_Id == doctorId).ToList();
            return doctorsAddressList;
        }
    }
}