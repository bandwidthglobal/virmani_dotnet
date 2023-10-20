using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.RequestModel
{
    public class NotificationRequest
    {
        public NotificationRequest() { }

        public Int32 UserId { get; set; }
        public string MobileNumber { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public string EmailMessage { get; set; }
        public string SmsMessage { get; set; }
        public string UserType { get; set; }
        public string Password { get; set; }
        public string Type { get; set; }
    }
}
