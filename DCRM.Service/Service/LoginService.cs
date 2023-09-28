using DCRM.Common;
using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Repository.Repository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class LoginService:ILoginService
    {
        public readonly ILoginRepository _loginRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;

        public LoginService(ILoginRepository loginRepository, IJwtUtils jwtUtils, IConfiguration configuration)
        {
            _loginRepository = loginRepository;
            _jwtUtils = jwtUtils;
            _configuration = configuration;
        }


        public AuthenticateResponse DoctorAuthenticate(AuthenticateRequest authenticateRequest)
        {
            authenticateRequest.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, authenticateRequest.Password);
            var user = _loginRepository.DoctorAuthenticate(authenticateRequest);
            // validate
            if (user == null)
                throw new AppException("email or password is incorrect");

            var jwtToken = _jwtUtils.GenerateJwtToken(Convert.ToInt32(user.Id), user?.Email, user?.Role, "");
            return new AuthenticateResponse(user.Email, Convert.ToInt32(user.Id), user.Role, jwtToken, user.Name, user.Thumb);
        }

        public AuthenticateResponse PatientAuthenticate(AuthenticateRequest authenticateRequest)
        {
            authenticateRequest.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, authenticateRequest.Password);
            var user = _loginRepository.PatientAuthenticate(authenticateRequest);
            // validate
            if (user == null)
                throw new AppException("email or password is incorrect");

            var jwtToken = _jwtUtils.GenerateJwtToken(user.Id, user?.Email, user?.Role, "");
            return new AuthenticateResponse(user.Email, user.Id, user.Role, jwtToken, user.Name, user.Thumb);
        }

        public AuthenticateResponse StaffAuthenticate(AuthenticateRequest authenticateRequest)
        {
            authenticateRequest.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, authenticateRequest.Password);
            var user = _loginRepository.StaffAuthenticate(authenticateRequest);
            // validate
            if (user == null)
                throw new AppException("email or password is incorrect");

            var jwtToken = _jwtUtils.GenerateJwtToken(user.Id, user?.Email, user?.Role, user?.User_Name);
            return new AuthenticateResponse(user.Email, user.Id, user.Role, jwtToken, user.Name, user.Thumb);
        }

        public AuthenticateResponse UserAuthenticate(AuthenticateRequest authenticateRequest)
        {
            authenticateRequest.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, authenticateRequest.Password);
            var user = _loginRepository.UserAuthenticate(authenticateRequest);
            // validate
            if (user == null)
                throw new AppException("email or password is incorrect");
            user.Role = "User";
            var jwtToken = _jwtUtils.GenerateJwtToken(user.Id, user?.Email, user?.Role, user?.User_Name);
            return new AuthenticateResponse(user.Email, user.Id, user.Role, jwtToken, user.Name, user.Thumb);
        }
    }
}
