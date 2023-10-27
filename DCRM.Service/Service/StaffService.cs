using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace DCRM.Service.Service
{
    public class StaffService : IStaffService
    {
        public readonly IStaffRepository _staffRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly INotificationService _notificationService;
        public readonly IConfiguration _configuration;
        public StaffService(IStaffRepository staffRepository, IJwtUtils jwtUtils, IConfiguration configuration, INotificationService notificationService)
        {
            _staffRepository = staffRepository;
            _jwtUtils = jwtUtils;
            _configuration = configuration;
            _notificationService = notificationService; 
        }

        /// <summary>
        /// User authenticate and return token for other request
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        /// <exception cref="AppException"></exception>
        public async Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest request)
        {
            request.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, request.Password);
            var staff = await _staffRepository.AuthenticateAsync(request);
            if (staff == null)
                throw new AppException("username or password is incorrect");

            // authentication successful so generate jwt and refresh tokens
            var jwtToken = _jwtUtils.GenerateJwtToken(staff.Id, staff.Email, staff.Role, staff.User_Name);
            return new AuthenticateResponse(staff.Email, staff.Id, staff.Role, jwtToken, staff.Name, staff.Thumb);
        }

        /// <summary>
        /// ftech all user active user
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Staff> GetAll()
        {
            return  _staffRepository.GetAll().OrderByDescending(x=>x.Id);
        }

        /// <summary>
        /// fetch satff by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public StaffDto Get(int id)
        {
            StaffDto staffDto = new StaffDto();
            var staff =  _staffRepository.Get(id);
            if (staff != null)
            {
                staffDto.Id = staff.Id;
                staffDto.User_Id = staff.User_Id;
                staffDto.Name = staff.Name;
                staffDto.Email = staff.Email;
                staffDto.Father = staff.Father;
                staffDto.Department = staff.Department;
                staffDto.Designation = staff.Designation;
                staffDto.Mother = staff.Mother;
                staffDto.Gender = staff.Gender;
                staffDto.Blood_Group = staff.Blood_Group;
                staffDto.Marital_Status = staff.Marital_Status;
                staffDto.Date_Of_Joining = staff.Date_Of_Joining;
                staffDto.Dob = staff.Dob;
                staffDto.Current_Address = staff.Current_Address;
                staffDto.Phone = staff.Phone;
                staffDto.Gst = staff.Gst;
                staffDto.Pan = staff.Pan;
                staffDto.Thumb = staff.Thumb;
                staffDto.Qualification = staff.Qualification;
                staffDto.Work_Experience = staff.Work_Experience;
                staffDto.Specialization = staff.Specialization;
                staffDto.Note = staff.Note;
                staffDto.Permanent_Address = staff.Permanent_Address;
                staffDto.Created_At = staff.Created_At;
                staffDto.StaffInsuranceList = _staffRepository.GetStaffInsuranceDetailList(staff.Id);
                staffDto.StaffBankList = _staffRepository.GetStaffBankDetailList(staff.Id);
                staffDto.StaffVaccinationList = _staffRepository.GetStaffVaccinationList(staff.Id);
            }
            return staffDto;

            // return await _staffRepository.GetStaffByIdAsync(id); ;
        }


        public long Create(StaffRequest staffRequest)
        {
            string password= EncryptionDecryptionUsingSymmetricKey.GenerateRandamPassword();
            staffRequest.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, password);
            long id= _staffRepository.Create(staffRequest);
            if (id>0)
            {
                NotificationRequest notificationRequest = new NotificationRequest();
                notificationRequest.EmailAddress = staffRequest.Email;
                notificationRequest.UserName = staffRequest.Name;
                notificationRequest.Password = password;
                _notificationService.SendRegistrationMail(notificationRequest);
            }
            return id;
        }
        /// <summary>;
        /// 
        /// update user 
        /// </summary>
        /// <param name="userUpdateRequestModel"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public void UpdateStaff(StaffRequest staffRequest)
        {
            _staffRepository.Update(staffRequest);
        }
        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public void Delete(int id)
        {
            _staffRepository.Delete(id);
        }

        /// <summary>
        /// change password according type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangeStaffPasswordAsync(ChangePasswordRequest changePasswordModel)
        {
            await _staffRepository.ChangeStaffPasswordAsync(changePasswordModel);
        }
        /// <summary>
        /// get staff by user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<StaffDto> GetStaffsByUserId(int userId)
        {
            var staffList = _staffRepository.GetStaffsByUserId(userId).OrderByDescending(x => x.Id);
            StaffDto staffDto = new StaffDto();
            List<StaffDto> staffDtoList = new List<StaffDto>();
            foreach (var staff in staffList)
            {
                staffDto.Id = staff.Id;
                staffDto.User_Id = staff.User_Id;
                staffDto.Name = staff.Name;
                staffDto.Email = staff.Email;
                staffDto.Father = staff.Father;
                staffDto.Department = staff.Department;
                staffDto.Designation = staff.Designation;
                staffDto.Mother = staff.Mother;
                staffDto.Gender = staff.Gender;
                staffDto.Blood_Group = staff.Blood_Group;
                staffDto.Marital_Status = staff.Marital_Status;
                staffDto.Date_Of_Joining = staff.Date_Of_Joining;
                staffDto.Dob = staff.Dob;
                staffDto.Phone = staff.Phone;
                staffDto.Gst = staff.Gst;
                staffDto.Pan = staff.Pan;
                staffDto.Qualification = staff.Qualification;
                staffDto.Work_Experience = staff.Work_Experience;
                staffDto.Specialization = staff.Specialization;
                staffDto.Note = staff.Note;
                staffDto.Permanent_Address = staff.Permanent_Address;
                staffDto.Created_At = staff.Created_At;

                staffDto.StaffInsuranceList = _staffRepository.GetStaffInsuranceDetailList(staff.Id);
                staffDto.StaffBankList = _staffRepository.GetStaffBankDetailList(staff.Id);
                staffDto.StaffVaccinationList = _staffRepository.GetStaffVaccinationList(staff.Id);
                staffDtoList.Add(staffDto);

            }
            return staffDtoList;
        }

    }
}