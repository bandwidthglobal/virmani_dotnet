using DCRM.Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IPaymentService
    {
        List<Payment_Workdone> GetPaymentWorkdones(int workdoneid);
        Payment_Workdone GetPaymentWorkdone(int workdoneid);
        void CreatePaymentWorkdone(Payment_Workdone payment_Workdone);
        void UpdatePaymentWorkdone(Payment_Workdone payment_Workdone);
        void DeletePaymentWorkdone(int id);
        void CreatePaymentHistory(Payment_History paymentHistory);
    }
}
