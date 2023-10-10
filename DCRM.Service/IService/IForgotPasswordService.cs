using DCRM.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IForgotPasswordService
    {
        string SendOtp(string phoneMumber);

        Userotp GetOtp(Userotp userOtp);
        long MatchOtp(string phoneMumber, string type);
        void ResetPassword(ForgotPassword forgotPassword);
    }
}
