using DCRM.Common.Entities;
using DCRM.Common.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IForgotPasswordService
    {
        string SendOtpByEmail(Userotp userotp);
        string SendOtp(string phoneMumber);

        Userotp GetOtp(Userotp userOtp);
        long MatchOtp(string phoneMumber, string type);
        void ResetPassword(ForgotPassword forgotPassword);

        string ChangePassword(ChangePasswordRequest changePassword);
    }
}
