using DCRM.Common.RequestModel;

namespace DCRM.Service.IService
{
    public interface INotificationService
    {
        void SendSMS(NotificationRequest notification);
        void SendMail(NotificationRequest notification);
        void SendRegistrationMail(NotificationRequest notification);
    }
}
