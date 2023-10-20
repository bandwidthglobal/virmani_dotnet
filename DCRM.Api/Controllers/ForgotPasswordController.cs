using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Request;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;

namespace DCRM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForgotPasswordController : ControllerBase
    {
        private readonly IForgotPasswordService _forgotPasswordService;
        public readonly IConfiguration _configuration;
        public ForgotPasswordController(IForgotPasswordService forgotPasswordService, IConfiguration configuration)
        {
            _forgotPasswordService = forgotPasswordService;
            _configuration = configuration;
        }

        [HttpPost("SendOtp")]
        public IActionResult SendOtpByEmail(Userotp userotp)
        {

            string otp = _forgotPasswordService.SendOtpByEmail(userotp);

            if (string.IsNullOrEmpty(otp))
            {
                return BadRequest("email is not registered");
            }
            else
            {
                return Ok(userotp);
            }
        }


        [HttpGet("SendOtp/{phoneNumber}")]
        public IActionResult SendOtp(string phoneNumber)
        {
          
            string otp = _forgotPasswordService.SendOtp(phoneNumber);
           
            if (string.IsNullOrEmpty(otp))
            {
                return BadRequest("phone number is not registered");
            }
            else
            {
                return Ok(phoneNumber);
            }
        }

        [HttpPost("ValidateOtp")]
        public IActionResult ValidateOtp(Userotp userOtp)
        {
            var user_otp = _forgotPasswordService.GetOtp(userOtp);
            string? OtpExpiresTime = _configuration.GetSection("OtpExpires").Value;

            long id = 0;
              

            if (!string.IsNullOrEmpty(user_otp.Otp))
            {
                var expiresTime = user_otp.CreatedDate.AddMinutes(Convert.ToInt32(OtpExpiresTime));
                if (expiresTime<System.DateTime.Now)
                {
                    throw new Exception("otp is expired");
                }
                id = _forgotPasswordService.MatchOtp(userOtp.Email, user_otp.UserType);
                user_otp.EntityId = id;
                return Ok(user_otp);
            }
            else
            {
                throw new Exception("otp is invalid");
            }
        }

        [HttpPost("MatchOtp")]
        public IActionResult MatchOtp(Userotp userOtp)
        {
            var user_otp = _forgotPasswordService.GetOtp(userOtp);
            string? OtpExpiresTime = _configuration.GetSection("OtpExpires").Value;

            long id = 0;


            if (!string.IsNullOrEmpty(user_otp.Otp))
            {
                var expiresTime = user_otp.CreatedDate.AddMinutes(Convert.ToInt32(OtpExpiresTime));
                if (expiresTime < System.DateTime.Now)
                {
                    return BadRequest("otp is expired");
                }
                id = _forgotPasswordService.MatchOtp(userOtp.PhoneNumber, user_otp.UserType);
                user_otp.EntityId = id;
                return Ok(user_otp);
            }
            else
            {
                return BadRequest("otp is invalid");
            }
        }
        //string password = EncryptionDecryptionUsingSymmetricKey.EncryptString(changePassword.NewPassword);
        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword(ForgotPassword forgotPassword)
        {
             _forgotPasswordService.ResetPassword(forgotPassword);
            return Ok();
        }

        [HttpPost("ChangePassword")]
        public IActionResult ChangePassword(ChangePasswordRequest changePassword)
        {
            if (changePassword.NewPassword.Equals(changePassword.ConfirmPassword))
            {
                string msg = _forgotPasswordService.ChangePassword(changePassword);
                if (!string.IsNullOrEmpty(msg))
                {
                    throw new Exception(msg);
                }
            }
            else
            {
                throw new Exception("passwords did not match");
            }
           
            return Ok();
        }
    }
}
