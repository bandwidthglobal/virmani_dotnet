using DCRM.Common;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Repository.IRepository;
using DCRM.Repository.Repository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using Twilio.Types;

namespace DCRM.Service.Service
{
    public class ForgotPasswordService : IForgotPasswordService
    {
        private readonly IRepository<Userotp> _userOtpRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Staff> _staffRepository;
        private readonly IRepository<Doctor> _doctorRepository;
        public readonly IConfiguration _configuration;
        public ForgotPasswordService(IRepository<Userotp> userOtpRepository, IRepository<User> userRepository,
            IConfiguration configuration, IRepository<Staff> staffRepository, IRepository<Doctor> doctorRepository)
        {
            _userOtpRepository = userOtpRepository;
            _userRepository = userRepository;
            _configuration = configuration;
            _staffRepository = staffRepository;
            _doctorRepository = doctorRepository;
        }
        public string SendOtp(string phoneMumber)
        {
            string otp = string.Empty;
           long entityId= 0;
            string type = string.Empty;
            var user = _userRepository.GetAll().FirstOrDefault(x => x.Phone == phoneMumber);
            if (user != null)
            {
                type = "user";
                entityId = user.Id;
            }
            else  {
                var staff = _staffRepository.GetAll().FirstOrDefault(x => x.Phone == phoneMumber);
                if (staff!=null)
                {
                    type = "staff";
                    entityId = staff.Id;
                }
                else
                {
                    var doctor = _doctorRepository.GetAll().FirstOrDefault(x => x.Phone1.ToString() == phoneMumber);
                    if (doctor!=null)
                    {
                        type = "doctor";
                        entityId = doctor.Id;
                    }
                }

            }
            if (string.IsNullOrEmpty(type))
            {
                return string.Empty;
            }
            else
            {
                var chars = "0123456789";
                var random = new Random();
                var result = new string(Enumerable.Repeat(chars, 4).Select(s => s[random.Next(s.Length)]).ToArray());
                otp = result;
                //string textMsg = @"" + result + @" is your mobile number verification code 
                //                    for Visitor Registration at Ebadge.in by SDPrmo";
                //string strUrl = @"http://nimbusit.net/api/pushsms?user=sdpromonet&authkey=xxxxxx&senderxxxxx&mobile=" + phoneMumber + "&text= " + textMsg + "&entityid=xxxxx&templateid=xxxxx&rpt=1";
                //WebRequest request = HttpWebRequest.Create(strUrl);
                //HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                //Stream s = (Stream)response.GetResponseStream();
                //StreamReader readStream = new StreamReader(s);
                //string dataString = readStream.ReadToEnd();
                //response.Close();
                //s.Close();
                //readStream.Close();
                Userotp? userOtp = _userOtpRepository.GetAll().FirstOrDefault(x => x.PhoneNumber == phoneMumber);
                if (userOtp != null)
                {
                    userOtp.Otp = otp;
                    userOtp.EntityId = entityId;
                    userOtp.UserType = type;
                    userOtp.CreatedDate = DateTime.Now;
                    userOtp.UpdatedDate = DateTime.Now;
                    _userOtpRepository.Update(userOtp);
                }
                else
                {
                    Userotp userOtpNew = new Userotp();
                    userOtpNew.PhoneNumber = phoneMumber;
                    userOtpNew.Otp = otp;
                    userOtpNew.UserType = type;
                    userOtpNew.CreatedDate = DateTime.Now;
                    userOtpNew.UpdatedDate = DateTime.Now;
                    _userOtpRepository.Create(userOtpNew);
                }
            }
            return otp;
        }

        public Userotp GetOtp(Userotp userOtp)
        {
            string otp = string.Empty;
            var user_Otp = _userOtpRepository.GetAll().FirstOrDefault(x => x.PhoneNumber == userOtp.PhoneNumber && x.Otp==userOtp.Otp);
            if (user_Otp != null)
            {
                userOtp.Otp = userOtp.Otp;
                userOtp.UserType= userOtp.UserType;
            }
            else
            {
                userOtp.Otp= string.Empty;
                userOtp.UserType = string.Empty;
            }
            return userOtp;
        }
        public long MatchOtp(string phoneMumber, string type)
        {
            var otp = string.Empty;
            long id = 0;
            var userOtp = _userOtpRepository.GetAll().FirstOrDefault(x => x.PhoneNumber == phoneMumber);
            if (type.ToLower() == "user")
            {
                var user = _userRepository.GetAll().FirstOrDefault(x => x.Phone == phoneMumber);
                id = user.Id;
            }
            else if (type.ToLower() == "staff")
            {
                var staff = _staffRepository.GetAll().FirstOrDefault(x => x.Phone == phoneMumber);
                id = staff.Id;
            }
            if (type.ToLower() == "doctor")
            {
                var doctor = _doctorRepository.GetAll().FirstOrDefault(x => x.Phone1.ToString() == phoneMumber);
                id = doctor.Id;
            }
            return id;
        }

        public void ResetPassword(ForgotPassword forgotPassword)
        {
            forgotPassword.NewPassword = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, forgotPassword.NewPassword);

            if (forgotPassword.Type.ToLower() == "user")
            {
                var user = _userRepository.Get(forgotPassword.EntityId);
                user.Password = forgotPassword.NewPassword;
                _userRepository.Update(user);

            }
            else if (forgotPassword.Type.ToLower() == "staff")
            {
                var staff = _staffRepository.Get(forgotPassword.EntityId);
                staff.Password = forgotPassword.NewPassword;
                _staffRepository.Update(staff);
            }
            else if (forgotPassword.Type.ToLower() == "doctor")
            {
                var doctor = _doctorRepository.Get(forgotPassword.EntityId);
                doctor.Password = forgotPassword.NewPassword;
                doctor.Updated_At= DateTime.Now;
                _doctorRepository.Update(doctor);
            }
        }
    }
}
