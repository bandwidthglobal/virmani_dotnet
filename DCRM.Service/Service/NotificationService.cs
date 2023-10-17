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

        public void SendMail(NotificationRequest notification)
        {
            var smtpSetting = _configuration.GetSection("SMTPSetting:Smtp").Value;
            string smtpServer = _configuration.GetSection("SMTPSetting:Smtp").Value;
            string port = _configuration.GetSection("SMTPSetting:Port").Value; //Convert.ToString(smtpSetting.GetSection("Port"));
            string userId = _configuration.GetSection("SMTPSetting:UserId").Value; //Convert.ToString(smtpSetting.GetSection("UserId"));
            string password = _configuration.GetSection("SMTPSetting:Password").Value; //Convert.ToString(smtpSetting.GetSection("Password"));
            string subject = _configuration.GetSection("SMTPSetting:Subject").Value;
            //string toCC = "info@creditinsta.com";
            const string fromEmail = "akjs005@hotmail.com";
            var message = new MailMessage
            {
                From = new MailAddress(fromEmail),
                To = { notification.EmailAddress },
                //CC = { toCC },
                Subject = "",
                Body = "this is test",
                DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure
            };

            using (SmtpClient smtpClient = new SmtpClient(smtpServer))
            {
                smtpClient.Credentials = new NetworkCredential(userId, password);
                smtpClient.Port = Convert.ToInt32(587);
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


            //string result = string.Empty;
            //string msg =  "123456 is the OTP to verify your mobile number on CreditInsta. Please dont share the OTP with anyone for security reasons.";
            //string uri = "https://foxxsms.com/sms//submitsms.jsp?user=sparkdg&key=735e2837d8XX&mobile=+91" + notification.MobileNumber + "&message=" + msg + "&senderid=CRINST&accusage=1";

            //string response = string.Empty;
            //HttpWebRequest req = WebRequest.Create(new Uri(uri)) as HttpWebRequest;
            //req.KeepAlive = false;
            //req.Method = "GET";
            //req.ContentType = "application/json";
            //try
            //{
            //    HttpWebResponse resp = req.GetResponse() as HttpWebResponse;
            //    using (StreamReader loResponseStream = new StreamReader(resp.GetResponseStream())) //, enc
            //    {
            //        response = loResponseStream.ReadToEnd();
            //        loResponseStream.Close();
            //        resp.Close();
            //    }
            //}
            //catch (Exception ex)
            //{
            //    throw new Exception(ex.Message);
            //}
        }
    }
}
