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
using System.Numerics;

namespace DCRM.Service.Service
{
    public class DoctorService : IDoctorService
    {
        public readonly IDoctorRepository _doctorRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;
        public DoctorService(IDoctorRepository doctorRepository, IJwtUtils jwtUtils, IConfiguration configuration)
        {
            _doctorRepository = doctorRepository;
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
            var doctor = await _doctorRepository.AuthenticateAsync(request);
            if (doctor == null)
                throw new AppException("username or password is incorrect");

            // authentication successful so generate jwt and refresh tokens
            var jwtToken = _jwtUtils.GenerateJwtToken(Convert.ToInt32(doctor.Id), doctor.Email, doctor.Role, doctor.Email);
            return new AuthenticateResponse(doctor.Email, Convert.ToInt32(doctor.Id), doctor.Role, jwtToken, doctor.Name, doctor.Thumb);
        }

        /// <summary>
        /// ftech all  active doctor
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<DoctorDto>> GetDoctorsAsync()
        {


            var list= await _doctorRepository.GetDoctorsAsync();
            DoctorDto doctorDto = new DoctorDto();
            List<DoctorDto> doctorLis=new List<DoctorDto>();
            foreach (var doctor in list.ToList())
            {
                doctorDto = new DoctorDto();
                doctorDto.Id = doctor.Id;
                doctorDto.User_Id = doctor.User_Id;
                doctorDto.Name = doctor.Name;
                doctorDto.Email = doctor.Email;
                doctorDto.Thumb = doctor.Thumb;
                doctorDto.Qualification = doctor.Qualification;
                doctorDto.Age = doctor.Age;
                doctorDto.Gender = doctor.Gender;
                doctorDto.Blood_Group = doctor.Blood_Group;
                doctorDto.Marital_Status = doctor.Marital_Status;
                doctorDto.Dob = doctor.Dob;
                doctorDto.Phone1 = doctor.Phone1;
                doctorDto.Phone2 = doctor.Phone2;
                doctorDto.Phone3 = doctor.Phone3;
                doctorDto.Phone4 = doctor.Phone4;
                doctorDto.Pan_Number = doctor.Pan_Number;
                doctorDto.Gst_Number = doctor.Gst_Number;
                doctorDto.Speciality = doctor.Speciality;
                doctorDto.Role = doctor.Role;
                doctorDto.Updated_At = doctor.Updated_At;
                doctorDto.DoctorInsuranceDetailList = _doctorRepository.GetDoctorInsuranceDetailList(Convert.ToInt32(doctor.Id));
                doctorDto.DoctorBankDetailList = _doctorRepository.GetDoctorBankDetailList(Convert.ToInt32(doctor.Id));
                doctorDto.DoctorsVaccinationList = _doctorRepository.GetDoctorVaccinationList(Convert.ToInt32(doctor.Id));
                doctorDto.DoctorsAddressList = _doctorRepository.GetDoctorsAddressDetailList(Convert.ToInt32(doctor.Id));
                doctorLis.Add(doctorDto);
            }
            return doctorLis;
        }

        /// <summary>
        /// fetch doctor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<DoctorDto> GetDoctorByIdAsync(int id)
        {

            var doctor = await _doctorRepository.GetDoctorByIdAsync(id);
            DoctorDto doctorDto = new DoctorDto();
            doctorDto.Id = doctor.Id;
            doctorDto.User_Id = doctor.User_Id;
            doctorDto.Name = doctor.Name;
            doctorDto.Email = doctor.Email;
            doctorDto.Thumb = doctor.Thumb;
            doctorDto.Qualification = doctor.Qualification;
            doctorDto.Age = doctor.Age;
            doctorDto.Gender = doctor.Gender;
            doctorDto.Blood_Group = doctor.Blood_Group;
            doctorDto.Marital_Status = doctor.Marital_Status;
            doctorDto.Dob = doctor.Dob;
            doctorDto.Phone1 = doctor.Phone1;
            doctorDto.Phone2 = doctor.Phone2;
            doctorDto.Phone3 = doctor.Phone3;
            doctorDto.Phone4 = doctor.Phone4;
            doctorDto.Pan_Number = doctor.Pan_Number;
            doctorDto.Gst_Number = doctor.Gst_Number;
            doctorDto.Speciality = doctor.Speciality;
            doctorDto.Role = doctor.Role;
            doctorDto.Updated_At = doctor.Updated_At;
            doctorDto.DoctorInsuranceDetailList = _doctorRepository.GetDoctorInsuranceDetailList(Convert.ToInt32(doctor.Id));
            doctorDto.DoctorBankDetailList = _doctorRepository.GetDoctorBankDetailList(Convert.ToInt32(doctor.Id));
            doctorDto.DoctorsVaccinationList = _doctorRepository.GetDoctorVaccinationList(Convert.ToInt32(doctor.Id));
            doctorDto.DoctorsAddressList = _doctorRepository.GetDoctorsAddressDetailList(Convert.ToInt32(doctor.Id));
            return doctorDto;

            // return await _staffRepository.GetStaffByIdAsync(id); ;
        }

        /// <summary>
        /// create doctor 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task CreateDoctorAsync(DoctorRequest request)
        {
            await _doctorRepository.CreateDoctorAsync(request);
        }

        /// <summary>;
        /// update doctor 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public void UpdateDoctor(DoctorRequest request)
        {
            _doctorRepository.UpdateDoctor(request);
        }
        /// <summary>
        /// remove doctor by  id from doctors table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public void DeleteDoctor(int id)
        {
            _doctorRepository.DeleteDoctor(id);
        }

        /// <summary>
        /// change password according type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangeDoctorPasswordAsync(ChangePasswordRequest changePasswordModel)
        {
            await _doctorRepository.ChangeDoctorPasswordAsync(changePasswordModel);
        }
        /// <summary>
        /// get doctor by user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<DoctorDto> GetDoctorsByUserId(int userId)
        {
            var doctorList = _doctorRepository.GetDoctorsByUserId(userId).OrderByDescending(x => x.Id);
            DoctorDto doctorDto = new DoctorDto();
            List<DoctorDto> doctorDtoList = new List<DoctorDto>();
            foreach (var doctor in doctorList)
            {
                doctorDto = new DoctorDto();
                doctorDto.Id = doctor.Id;
                doctorDto.User_Id = doctor.User_Id;
                doctorDto.Name = doctor.Name;
                doctorDto.Email = doctor.Email;
                doctorDto.Thumb = doctor.Thumb;
                doctorDto.Qualification = doctor.Qualification;
                doctorDto.Age = doctor.Age;
                doctorDto.Gender = doctor.Gender;
                doctorDto.Blood_Group = doctor.Blood_Group;
                doctorDto.Marital_Status = doctor.Marital_Status;
                doctorDto.Dob = doctor.Dob;
                doctorDto.Phone1 = doctor.Phone1;
                doctorDto.Phone2 = doctor.Phone2;
                doctorDto.Phone3 = doctor.Phone3;
                doctorDto.Phone4 = doctor.Phone4;
                doctorDto.Pan_Number = doctor.Pan_Number;
                doctorDto.Gst_Number = doctor.Gst_Number;
                doctorDto.Marital_Status = doctor.Marital_Status;
                doctorDto.Speciality = doctor.Speciality;
                doctorDto.Role = doctor.Role;
                doctorDto.Updated_At = doctor.Updated_At;
                doctorDto.DoctorInsuranceDetailList = _doctorRepository.GetDoctorInsuranceDetailList(Convert.ToInt32(doctor.Id));
                doctorDto.DoctorBankDetailList = _doctorRepository.GetDoctorBankDetailList(Convert.ToInt32(doctor.Id));
                doctorDto.DoctorsVaccinationList = _doctorRepository.GetDoctorVaccinationList(Convert.ToInt32(doctor.Id));
                doctorDto.DoctorsAddressList = _doctorRepository.GetDoctorsAddressDetailList(Convert.ToInt32(doctor.Id));
                doctorDtoList.Add(doctorDto);
            }
            return doctorDtoList;
        }

    }
}