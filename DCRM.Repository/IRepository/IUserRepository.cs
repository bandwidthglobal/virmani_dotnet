using DCRM.Common;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.IRepository
{
    public interface IUserRepository
    {
        Task<User> AuthenticateAsync(AuthenticateRequest authenticateRequest);

        Task<IEnumerable<User>> GetUsersAsync();

        Task<User> GetUserByIdAsync(int id);

        Task SaveUserAsync(User user);

        Task UpdateUserAsync(User user);

        Task DeleteUserAsync(int id);

        Task ChangeUserPasswordAsync(ChangePasswordRequest changePasswordModel);

    } 
}
