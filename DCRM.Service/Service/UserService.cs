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

namespace DCRM.Service.Service
{
    public class UserService : IUserService
    {
        public readonly IUserRepository _userRepository;

        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;
        public readonly IRepository<Experience> _experienceRepository;
        public readonly IRepository<Chamber> _chamberRepository;
        public readonly IRepository<Diagonosis> _diagonosisRepository;
        public UserService(IUserRepository userRepository, IJwtUtils jwtUtils, IConfiguration configuration, 
            IRepository<Experience> experienceRepository, IRepository<Chamber> chamberRepository, IRepository<Diagonosis> diagonosisRepository)
        {
            _userRepository = userRepository;
            _jwtUtils = jwtUtils;
            _configuration = configuration;
            _experienceRepository = experienceRepository;
            _chamberRepository = chamberRepository;
            _diagonosisRepository = diagonosisRepository;
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

            var jwtToken = _jwtUtils.GenerateJwtToken(user.Id, user?.Email, user?.Role, user?.User_Name);
            return new AuthenticateResponse(user.Email, user.Id, user.Role, jwtToken, user.Name, user.Thumb);
        }

        /// <summary>
        /// ftech all user active user
        /// </summary>
        /// <returns></returns>
        public IEnumerable<User> GetAll()
        {
            return _userRepository.GetAll();
        }

        /// <summary>
        /// fetch user by user id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public User Get(long id)
        {
            return _userRepository.Get(id);
        }

        public UserDto GetUserChamber(long id)
        {
            var chamber = _chamberRepository.GetAll().Where(x => x.User_Id == 2).FirstOrDefault();
            var user = _userRepository.Get(id);
            UserDto userDto = new UserDto();
            if (chamber != null)
            {
                userDto.Name = user.Name;
                userDto.Email = user.Email;
                userDto.ChamberName = chamber.Name;
                userDto.ChamberTitle = chamber.Title;
                userDto.Chamber_Id = chamber.Id.ToString();
            }
            return userDto;
        }
        /// <summary>
        /// save user in users table
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long Create(UserRequest userRequest)
        {
            User user = new User();
            user.Name = userRequest.Name;
            user.Email = userRequest.Email;
            user.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, userRequest.Password);
            user.Role = userRequest.Role;
            user.Status =1;
            long id = _userRepository.Create(user);
            return id;
        }
        /// <summary>
        /// update user 
        /// </summary>
        /// <param name="userUpdateRequestModel"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public void Update(UserUpdateRequest userUpdateRequestModel)
        {
            var user = _userRepository.Get(userUpdateRequestModel.Id);
            if (user != null)
            {
                user.About_Me = userUpdateRequestModel.AboutMe;
                user.Name = userUpdateRequestModel.Name;
                user.City = userUpdateRequestModel.City;
                user.Degree = userUpdateRequestModel.Degree;
                user.Specialist = userUpdateRequestModel.Specialist;
                user.Exp_Years = userUpdateRequestModel.ExperienceYears;
                _userRepository.Update(user);
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
        public void Delete(long id)
        {
            _userRepository.Delete(id);
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

        public void CreateDiagonosis(Diagonosis diagonosis)
        {
            _diagonosisRepository.Insert(diagonosis);
        }
        public void UpdateDiagonosis(Diagonosis diagonosis)
        {
            _diagonosisRepository.Update(diagonosis);
        }
        public void DeleteDiagonosis(long id)
        {
            var diagonosis= _diagonosisRepository.Get(id);
            _diagonosisRepository.Delete(diagonosis);
        }
    }
}