using DCRM.Common;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using System.Data.SqlTypes;

namespace DCRM.Repository.Repository
{
    public class UserRepository : IUserRepository
    {

        public readonly DCRMDBContext _contex;
        public UserRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        /// <summary>
        /// User authenticate and return token for other request
        /// </summary>
        /// <param name="authenticateRequest"></param>
        /// <returns></returns>
        public async Task<User> AuthenticateAsync(AuthenticateRequest authenticateRequest)
        {
            var user = await _contex.Users.SingleOrDefaultAsync(x => x.Status == 1 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);

            return user;

        }

        /// <summary>
        /// ftech all user active user
        /// </summary>
        /// <returns></returns>

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            IEnumerable<User> users = _contex.Users.Where(x => x.Status == 1);
            return users;
        }

        /// <summary>
        /// fetch user by user id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<User> GetUserByIdAsync(int id)
        {
            User user = await _contex.Users.FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }

        /// <summary>
        /// save user in users table
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task SaveUserAsync(User user)
        {
            try
            {
                var userDetails= _contex.Users.FirstOrDefault(x=>x.Email== user.Email);
                if (userDetails==null)
                {
                    await _contex.Users.AddAsync(user);
                    _contex.SaveChanges();
                }
                else
                {
                    throw new SqlAlreadyFilledException("user already exist");
                }
                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        /// <summary>
        /// update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public async Task UpdateUserAsync( User user)
        {
            _contex.Users.Update(user);
            await _contex.SaveChangesAsync();
        }

        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteUserAsync(int id)
        {
            User user = await _contex.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user!=null)
            {
                user.Status = 0;
                _contex.Update(user);
                await _contex.SaveChangesAsync();
            }
           
        }

        /// <summary>
        /// password change according user type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangeUserPasswordAsync(ChangePasswordRequest changePasswordModel)
        {
            
            if (changePasswordModel.Type.ToLower()=="user")
            {
                var user = await _contex.Users.FirstOrDefaultAsync(x => x.Id == changePasswordModel.Id);
                if (user != null)
                {
                    user.Password = changePasswordModel.NewPassword;
                    _contex.Update(user);
                    await _contex.SaveChangesAsync();
                }
                else { throw new KeyNotFoundException("user is not found"); }
            }
            
        }
    }
}