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

        public IEnumerable<User> GetAll()
        {
            IEnumerable<User> users = _contex.Users.Where(x => x.Status == 1);
            return users;
        }

        /// <summary>
        /// fetch user by user id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public User Get(long id)
        {
            User? user = _contex.Users.FirstOrDefault(x => x.Id == id);
            return user;
        }

        /// <summary>
        /// save user in users table
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public long Create(User user)
        {
            var userDetails = _contex.Users.FirstOrDefault(x => x.Email == user.Email);
            if (userDetails == null)
            {
                _contex.Users.Add(user);
                _contex.SaveChanges();
                return user.Id;
            }
            else
            {
                throw new SqlAlreadyFilledException("user already exist");
            }
        }

        /// <summary>
        /// update user
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public void Update(User user)
        {
            _contex.Users.Update(user);
            _contex.SaveChanges();
        }

        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public void Delete(long id)
        {
            User? user = _contex.Users.FirstOrDefault(x => x.Id == id);
            if (user != null)
            {
                user.Status = 1;
                _contex.Update(user);
                _contex.SaveChanges();
            }

        }

        /// <summary>
        /// password change according user type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangeUserPasswordAsync(ChangePasswordRequest changePasswordModel)
        {

            if (changePasswordModel.Type.ToLower() == "user" || changePasswordModel.Type.ToLower() == "admin")
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