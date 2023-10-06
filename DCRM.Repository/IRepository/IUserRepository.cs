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

        IEnumerable<User> GetAll();

        User Get(long id);

        long Create(User user);

        void Update(User user);

        void Delete(long id);

        Task ChangeUserPasswordAsync(ChangePasswordRequest changePasswordModel);

    } 
}
