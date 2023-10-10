using DCRM.Common.Dto;
using DCRM.Common.Entities;
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

        [HttpPost("MatchOtp")]
        public IActionResult MatchOtp(Userotp userOtp)
        {
            var user_otp = _forgotPasswordService.GetOtp(userOtp);
            string? OtpExpiresTime = _configuration.GetSection("OtpExpires").Value;

            long id = 0;
              

            if (!string.IsNullOrEmpty(user_otp.Otp))
            {
                var expiresTime = user_otp.CreatedDate.AddMinutes(Convert.ToInt32(OtpExpiresTime));
                if (expiresTime<System.DateTime.Now)
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

        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword(ForgotPassword forgotPassword)
        {
             _forgotPasswordService.ResetPassword(forgotPassword);
            return Ok();
        }
    }
}
