using DCRM.Common.RequestModel;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;
using Microsoft.Identity.Client;
using MySqlX.XDevAPI.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace DCRM.Service.Service
{
    public class NotificationService : INotificationService
    {
        public readonly IConfiguration _configuration;
        public NotificationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendRegistrationMail(NotificationRequest notification)
        {
            string smtpServer = _configuration.GetSection("SMTPSetting:Smtp").Value;
            string port = _configuration.GetSection("SMTPSetting:Port").Value;
            string userId = _configuration.GetSection("SMTPSetting:UserId").Value;
            string password = _configuration.GetSection("SMTPSetting:Password").Value;
            string subject = "Virmani Account";//_configuration.GetSection("SMTPSetting:Subject").Value;
            const string fromEmail = "no-reply@virmani.com";
            StringBuilder sb = new StringBuilder();
            sb.Append("Hi " + notification.UserName);
            sb.Append("<br/>");
            sb.Append("<br/>");
            sb.Append("Your account has been created.");
            sb.Append("<br/>");
            sb.Append("UserName : " + notification.EmailAddress);
            sb.Append("<br/>");
            sb.Append("Password : " + notification.Password);
            sb.Append("<br/>");
            sb.Append("<br/>");
            sb.Append("Regards");
            sb.Append("<br/>");
            sb.Append("Admin Virmani");
            var message = new MailMessage
            {
                IsBodyHtml = true,
                From = new MailAddress(fromEmail),
                To = { notification.EmailAddress },
                Subject = subject,
                Body = sb.ToString(),
                DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure,
            };

            using (SmtpClient smtpClient = new SmtpClient(smtpServer))
            {
                smtpClient.Credentials = new NetworkCredential(userId, password);

                smtpClient.Port = Convert.ToInt32(port);
                smtpClient.UseDefaultCredentials = false;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = true;
                smtpClient.Send(message);
            }
        }
        public void SendMail(NotificationRequest notification)
        {
            string smtpServer = _configuration.GetSection("SMTPSetting:Smtp").Value;
            string port = _configuration.GetSection("SMTPSetting:Port").Value; 
            string userId = _configuration.GetSection("SMTPSetting:UserId").Value;
            string password = _configuration.GetSection("SMTPSetting:Password").Value;
            string subject = _configuration.GetSection("SMTPSetting:Subject").Value;
            const string fromEmail = "akjs005@hotmail.com";
            var message = new MailMessage
            {
                From = new MailAddress(fromEmail),
                To = { notification.EmailAddress },
                Subject = subject,
                Body = "this is test",
                DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure
            };

            using (SmtpClient smtpClient = new SmtpClient(smtpServer))
            {
                smtpClient.Credentials = new NetworkCredential(userId, password);
                smtpClient.Port = Convert.ToInt32(port);
                smtpClient.UseDefaultCredentials = false;
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.Timeout = 20000;
                smtpClient.EnableSsl = true;
                smtpClient.Send(message);
            }
        }

        public void SendSMS(NotificationRequest notification)
        {

            TwilioClient.Init("ACe6b7f418ea1517b8410391cb5e6b74e0", "980f38256a20e094cc9b8f2c81a6ff61");
            var message = MessageResource.Create(
                body: "this is test from vrmani application.",
                from: new Twilio.Types.PhoneNumber("++12565988563"),
                to: new Twilio.Types.PhoneNumber("+919312998984")
            );
        }
    }
}
