using DCRM.Common.Dto;
using DCRM.Common.Entities;
using Demo_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IPaymentService
    {
        List<Payment_History> GetAll(long patientId);
        Payment_History Get(long id);
        List<Payment_Workdone> GetPaymentWorkdones(int workdoneid);
        Payment_Workdone GetPaymentWorkdone(int workdoneid);
        void CreatePaymentWorkdone(Payment_Workdone payment_Workdone);
        void UpdatePaymentWorkdone(Payment_Workdone payment_Workdone);
        void DeletePaymentWorkdone(int id);
        void Create(Payment_History paymentHistory);
        void Update(Payment_History paymentHistory);
        void Delete(long id);
        void CreateReceivePayment(Payment_Details_List payment_Details_List);

        List<Payment_Details_List> GetReceivedPayment(long paymentId);

        PaymentReportDto GetPaymentReport(long paymentId);

        List<PaymentReportDto> GetPaymentReportList(long userId);
    }
}
