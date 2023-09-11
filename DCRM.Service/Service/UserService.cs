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
    public class UserService : IUserService
    {
        public readonly IUserRepository _userRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;
        public UserService(IUserRepository userRepository, IJwtUtils jwtUtils, IConfiguration configuration)
        {
            _userRepository = userRepository;
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
            var user = await _userRepository.AuthenticateAsync(request);
            // validate
            if (user == null)
                throw new AppException("email or password is incorrect");

            var jwtToken = _jwtUtils.GenerateJwtToken(user.Id, user?.Email,user?.Role,user?.User_Name);
            return new AuthenticateResponse(user.Email,user.Id,user.Role, jwtToken);
        }

        /// <summary>
        /// ftech all user active user
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _userRepository.GetUsersAsync();
        }

        /// <summary>
        /// fetch user by user id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetUserByIdAsync(id); ;
        }

        /// <summary>
        /// save user in users table
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task SaveUserAsync(UserRequest userRequest)
        {
            User user = new User();
            user.Name = userRequest.Name;
            user.Email = userRequest.Email;
            user.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, userRequest.Password);
            user.Role = userRequest.Role;
            await _userRepository.SaveUserAsync(user);
        }
        /// <summary>
        /// update user 
        /// </summary>
        /// <param name="userUpdateRequestModel"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public async Task UpdateUserAsync(UserUpdateRequest userUpdateRequestModel)
        {
            var user = await _userRepository.GetUserByIdAsync(userUpdateRequestModel.Id);
            if (user != null)
            {
                user.About_Me = userUpdateRequestModel.AboutMe;
                user.Name = userUpdateRequestModel.Name;
                user.City = userUpdateRequestModel.City;
                user.Degree = userUpdateRequestModel.Degree;
                user.Specialist = userUpdateRequestModel.Specialist;
                user.Exp_Years = userUpdateRequestModel.ExperienceYears;
                await _userRepository.UpdateUserAsync(user);
            }
            else
            {
                throw new KeyNotFoundException("user is not found");
            }

            
        }
        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteUserAsync(int id)
        {
            await _userRepository.DeleteUserAsync(id);
        }

        /// <summary>
        /// change password according type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangeUserPasswordAsync(ChangePasswordRequest changePasswordModel)
        {
            changePasswordModel.NewPassword = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, changePasswordModel.NewPassword);
            await _userRepository.ChangeUserPasswordAsync(changePasswordModel);
        }

    }
}