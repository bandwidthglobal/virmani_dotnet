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
    public class StaffService : IStaffService
    {
        public readonly IStaffRepository _staffRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;
        public StaffService(IStaffRepository staffRepository, IJwtUtils jwtUtils, IConfiguration configuration)
        {
            _staffRepository = staffRepository;
            _jwtUtils = jwtUtils;
            _configuration = configuration;
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
        public async Task<IEnumerable<Staff>> GetStaffsAsync()
        {
            return await _staffRepository.GetStaffsAsync();
        }

        /// <summary>
        /// fetch satff by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<StaffDto> GetStaffByIdAsync(int id)
        {
            StaffDto staffDto = new StaffDto();
            var staff = await _staffRepository.GetStaffByIdAsync(id);
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
            }
            return staffDto;

            // return await _staffRepository.GetStaffByIdAsync(id); ;
        }

        /// <summary>
        /// save user in users table
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task SaveStaffAsync(StaffRequest staffRequest)
        {
            Staff staff = new Staff();
            staff.Name = staffRequest.Name;
            staff.Email = staffRequest.Email;
            staff.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, staffRequest.Password);
            staff.Role = staffRequest.Role;
            await _staffRepository.SaveStaffAsync(staff);
        }

        public async Task CreateStaffByUserAsync(StaffRequest staffRequest)
        {
            await _staffRepository.CreateStaffByUserAsync(staffRequest);
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
            _staffRepository.UpdateStaff(staffRequest);
        }
        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteStaffAsync(int id)
        {
            await _staffRepository.DeleteStaffAsync(id);
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