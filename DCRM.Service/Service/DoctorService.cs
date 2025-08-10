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
    public class DoctorService : IDoctorService
    {
        public readonly IDoctorRepository _doctorRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;
        public readonly INotificationService _notificationService;
        public DoctorService(IDoctorRepository doctorRepository, IJwtUtils jwtUtils, IConfiguration configuration, INotificationService notificationService)
        {
            _doctorRepository = doctorRepository;
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
        public IEnumerable<DoctorDto> GetAll()
        {


            var list=  _doctorRepository.GetAll();
            _ = new DoctorDto();
            List<DoctorDto> doctorLis=new();
            foreach (var doctor in list.ToList())
            {
                DoctorDto doctorDto = new()
                {
                    Id = doctor.Id,
                    User_Id = doctor.User_Id,
                    Name = doctor.Name,
                    Email = doctor.Email,
                    Thumb = doctor.Thumb,
                    Qualification = doctor.Qualification,
                    Age = doctor.Age,
                    Gender = doctor.Gender,
                    Blood_Group = doctor.Blood_Group,
                    Marital_Status = doctor.Marital_Status,
                    Dob = doctor.Dob,
                    Phone1 = doctor.Phone1,
                    Phone2 = doctor.Phone2,
                    Phone3 = doctor.Phone3,
                    Phone4 = doctor.Phone4,
                    Pan_Number = doctor.Pan_Number,
                    Gst_Number = doctor.Gst_Number,
                    Speciality = doctor.Speciality,
                    Role = doctor.Role,
                    Updated_At = doctor.Updated_At,
                    DoctorInsuranceDetailList = _doctorRepository.GetDoctorInsuranceDetailList(Convert.ToInt32(doctor.Id)),
                    DoctorBankDetailList = _doctorRepository.GetDoctorBankDetailList(Convert.ToInt32(doctor.Id)),
                    DoctorsVaccinationList = _doctorRepository.GetDoctorVaccinationList(Convert.ToInt32(doctor.Id)),
                    DoctorsAddressList = _doctorRepository.GetDoctorsAddressDetailList(Convert.ToInt32(doctor.Id))
                };
                doctorLis.Add(doctorDto);
            }
            return doctorLis;
        }

        /// <summary>
        /// fetch doctor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DoctorDto Get(long id)
        {

            var doctor =  _doctorRepository.Get(id);
            DoctorDto doctorDto = new()
            {
                Id = doctor.Id,
                User_Id = doctor.User_Id,
                Name = doctor.Name,
                Email = doctor.Email,
                Thumb = doctor.Thumb,
                Qualification = doctor.Qualification,
                Age = doctor.Age,
                Gender = doctor.Gender,
                Blood_Group = doctor.Blood_Group,
                Marital_Status = doctor.Marital_Status,
                Dob = doctor.Dob,
                Phone1 = doctor.Phone1,
                Phone2 = doctor.Phone2,
                Phone3 = doctor.Phone3,
                Phone4 = doctor.Phone4,
                Pan_Number = doctor.Pan_Number,
                Gst_Number = doctor.Gst_Number,
                Speciality = doctor.Speciality,
                Role = doctor.Role,
                Updated_At = doctor.Updated_At,
                DoctorInsuranceDetailList = _doctorRepository.GetDoctorInsuranceDetailList(Convert.ToInt32(doctor.Id)),
                DoctorBankDetailList = _doctorRepository.GetDoctorBankDetailList(Convert.ToInt32(doctor.Id)),
                DoctorsVaccinationList = _doctorRepository.GetDoctorVaccinationList(Convert.ToInt32(doctor.Id)),
                DoctorsAddressList = _doctorRepository.GetDoctorsAddressDetailList(Convert.ToInt32(doctor.Id))
            };
            return doctorDto;

            // return await _staffRepository.GetStaffByIdAsync(id); ;
        }

        /// <summary>
        /// create doctor 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public void Create(DoctorRequest request)
        {
            string password = EncryptionDecryptionUsingSymmetricKey.GenerateRandamPassword();
            request.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, password);
            _doctorRepository.Create(request);
            NotificationRequest notificationRequest = new()
            {
                EmailAddress = request.Email,
                UserName = request.Name,
                Password = password
            };
            _notificationService.SendRegistrationMail(notificationRequest);
            
        }

        /// <summary>;
        /// update doctor 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public void Update(DoctorRequest request)
        {
            _doctorRepository.Update(request);
        }
        /// <summary>
        /// remove doctor by  id from doctors table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public void Delete(long id)
        {
            _doctorRepository.Delete(id);
        }

        /// <summary>
        /// change password according type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public void ChangePassword(ChangePasswordRequest changePasswordModel)
        {
             _doctorRepository.ChangePassword(changePasswordModel);
        }
        /// <summary>
        /// get doctor by user
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<DoctorDto> GetDoctorsByUserId(int userId)
        {
            var doctorList = _doctorRepository.GetDoctorsByUserId(userId).OrderByDescending(x => x.Id).ToList();
            DoctorDto doctorDto = new();
            List<DoctorDto> doctorDtoList = new();
            foreach (var doctor in doctorList)
            {
                doctorDto = new DoctorDto
                {
                    Id = doctor.Id,
                    User_Id = doctor.User_Id,
                    Name = doctor.Name,
                    Email = doctor.Email,
                    Thumb = doctor.Thumb,
                    Qualification = doctor.Qualification,
                    Age = doctor.Age,
                    Gender = doctor.Gender,
                    Blood_Group = doctor.Blood_Group,
                    Marital_Status = doctor.Marital_Status,
                    Dob = doctor.Dob,
                    Phone1 = doctor.Phone1,
                    Phone2 = doctor.Phone2,
                    Phone3 = doctor.Phone3,
                    Phone4 = doctor.Phone4,
                    Pan_Number = doctor.Pan_Number,
                    Gst_Number = doctor.Gst_Number
                };
                doctorDto.Marital_Status = doctor.Marital_Status;
                doctorDto.Speciality = doctor.Speciality;
                doctorDto.Role = doctor.Role;
                doctorDto.Updated_At = doctor.Updated_At;
                //doctorDto.DoctorInsuranceDetailList = _doctorRepository.GetDoctorInsuranceDetailList(Convert.ToInt32(doctor.Id));
                //doctorDto.DoctorBankDetailList = _doctorRepository.GetDoctorBankDetailList(Convert.ToInt32(doctor.Id));
                //doctorDto.DoctorsVaccinationList = _doctorRepository.GetDoctorVaccinationList(Convert.ToInt32(doctor.Id));
                //doctorDto.DoctorsAddressList = _doctorRepository.GetDoctorsAddressDetailList(Convert.ToInt32(doctor.Id));
                doctorDtoList.Add(doctorDto);
            }
            return doctorDtoList;
        }
        public List<DropdownDataDto> NameList(long userId)
        {
           return _doctorRepository.NameList(userId);
        }
    }
}