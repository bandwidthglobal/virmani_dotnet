using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Repository.Repository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;

namespace DCRM.Service.Service
{
    public class PatientService : IPatientService
    {
        public readonly IPatientRepository _patientRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;
        public PatientService(IPatientRepository patientRepository, IJwtUtils jwtUtils, IConfiguration configuration)
        {
            _patientRepository = patientRepository;
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
            var patient = await _patientRepository.AuthenticateAsync(request);
            if (patient == null)
                throw new AppException("username or password is incorrect");

            var jwtToken = _jwtUtils.GenerateJwtToken(patient.Id, patient.Email, patient.Role, patient.Email);
            return new AuthenticateResponse(patient.Email, patient.Email, patient.Id, patient.Role, jwtToken);
        }

        /// <summary>
        /// ftech all user active user
        /// </summary>
        /// <returns></returns>
        public async Task<List<PatientseDto>> GetAllAsync()
        {

            var patients = await _patientRepository.GetAllAsync();
            PatientseDto patientseDto = new PatientseDto();
            List<PatientseDto> patientList = new List<PatientseDto>();
            foreach (var patient in patients)
            {
                patientseDto = new PatientseDto();
                patientseDto.Id = patient.Id;
                patientseDto.Chamber_Id = patient.Chamber_Id;
                patientseDto.User_name = patient.UserName;
                patientseDto.Mr_Number = patient.Mr_Number;
                patientseDto.Name = patient.Name;
                patientseDto.User_name = patient.UserName;
                patientseDto.Slug = patient.Slug;
                patientseDto.Thumb = patient.Thumb;
                patientseDto.Email = patient.Email;
                patientseDto.Age = patient.Age;
                patientseDto.Weight = patient.Weight;
                patientseDto.Sex = patient.Sex;
                patientseDto.Title = patient.Title;
                patientseDto.Guardian = patient.Guardian;
                patientseDto.Present_Address = patient.Present_Address;
                patientseDto.Permanent_Address = patient.Permanent_Address;
                patientseDto.Created_At = System.DateTime.UtcNow;
                patientseDto.PatientInsuranceLoans = _patientRepository.GetPatientsInsuranceLoanDetailList(patient.Id);
                patientseDto.PatientTests = _patientRepository.GetPatientTestList(patient.Id);
                patientseDto.PatientContacts = _patientRepository.GetPatientsContacteDetailList(patient.Id);
                patientseDto.PatientScans = _patientRepository.GetPatientScanList(patient.Id);
                patientList.Add(patientseDto);
            }
            return patientList;
        }

        /// <summary>
        /// fetch satff by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<PatientseDto> GetByIdAsync(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            PatientseDto patientdto = new PatientseDto();
            patientdto.Id = patient.Id;
            patientdto.Chamber_Id = patient.Chamber_Id;
            patientdto.User_name = patient.UserName;
            patientdto.Mr_Number = patient.Mr_Number;
            patientdto.Name = patient.Name;
            patientdto.User_name = patient.UserName;
            patientdto.Slug = patient.Slug;
            patientdto.Thumb = patient.Thumb;
            patientdto.Email = patient.Email;
            patientdto.Age = patient.Age;
            patientdto.Weight = patient.Weight;
            patientdto.Sex = patient.Sex;
            patientdto.Title = patient.Title;
            patientdto.Guardian = patient.Guardian;
            patientdto.Present_Address = patient.Present_Address;
            patientdto.Permanent_Address = patient.Permanent_Address;
            patientdto.Created_At = System.DateTime.UtcNow;
            patientdto.PatientInsuranceLoans=_patientRepository.GetPatientsInsuranceLoanDetailList( patient.Id );
            patientdto.PatientTests = _patientRepository.GetPatientTestList(patient.Id);
            patientdto.PatientContacts = _patientRepository.GetPatientsContacteDetailList(patient.Id);
            patientdto.PatientScans = _patientRepository.GetPatientScanList(patient.Id);
            return patientdto;
        }


        /// <summary>
        /// fetch satff by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<PatientseDto> GetByUserIdAsync(int userid)
        {
            var patients =  _patientRepository.GetByUserId(userid);
            PatientseDto patientseDto = new PatientseDto();
            List<PatientseDto> patientList = new List<PatientseDto>();
            foreach (var patient in patients)
            {
                patientseDto = new PatientseDto();
                patientseDto.Id = patient.Id;
                patientseDto.Chamber_Id = patient.Chamber_Id;
                patientseDto.User_name = patient.UserName;
                patientseDto.Mr_Number = patient.Mr_Number;
                patientseDto.Name = patient.Name;
                patientseDto.User_name = patient.UserName;
                patientseDto.Slug = patient.Slug;
                patientseDto.Thumb = patient.Thumb;
                patientseDto.Email = patient.Email;
                patientseDto.Age = patient.Age;
                patientseDto.Weight = patient.Weight;
                patientseDto.Sex = patient.Sex;
                patientseDto.Title = patient.Title;
                patientseDto.Guardian = patient.Guardian;
                patientseDto.Present_Address = patient.Present_Address;
                patientseDto.Permanent_Address = patient.Permanent_Address;
                patientseDto.Created_At = System.DateTime.UtcNow;
                patientseDto.PatientInsuranceLoans = _patientRepository.GetPatientsInsuranceLoanDetailList(patient.Id);
                patientseDto.PatientTests = _patientRepository.GetPatientTestList(patient.Id);
                patientseDto.PatientContacts = _patientRepository.GetPatientsContacteDetailList(patient.Id);
                patientseDto.PatientScans = _patientRepository.GetPatientScanList(patient.Id);
                patientList.Add(patientseDto);
            }
            return patientList;
        }

        public async Task CreateAsync(PatientRequest request)
        {
            await _patientRepository.CreateAsync(request);
        }
        /// <summary>;
        /// 
        /// update user 
        /// </summary>
        /// <param name="userUpdateRequestModel"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public void Update(PatientRequest request)
        {
            _patientRepository.Update(request);
        }
        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync(int id)
        {
            await _patientRepository.DeleteAsync(id);
        }

        /// <summary>
        /// change password according type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangePasswordAsync(ChangePasswordRequest changePasswordModel)
        {
            await _patientRepository.ChangePatientPasswordAsync(changePasswordModel);
        }
    }
}