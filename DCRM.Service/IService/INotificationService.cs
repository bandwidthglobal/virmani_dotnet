using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface INotificationService
    {
        void SendSMS(NotificationRequest notification);
        void SendMail(NotificationRequest notification);
        void SendRegistrationMail(NotificationRequest notification);
    }
}
