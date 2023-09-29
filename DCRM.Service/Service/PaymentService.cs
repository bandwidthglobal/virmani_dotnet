using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Demo_Api.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.Service
{
    public class PaymentService : IPaymentService
    {
        private readonly IRepository<Payment_History> _paymentHistoryRepository;
        private readonly IRepository<Payment_Workdone> _paymentWorkdoneRepository;
        private readonly IRepository<Payment_Details_List> _paymentDetailsListRepository;
        public PaymentService(IRepository<Payment_History> paymentHistoryRepository
            , IRepository<Payment_Workdone> paymentWorkdoneRepository
            , IRepository<Payment_Details_List> paymentDetailsListRepository)
        {
            _paymentHistoryRepository = paymentHistoryRepository;
            _paymentWorkdoneRepository = paymentWorkdoneRepository;
            _paymentDetailsListRepository = paymentDetailsListRepository;

        }

        public List<Payment_Workdone> GetPaymentWorkdones(int workdoneid)
        {
            List<Payment_Workdone> paymentWorkdones = new List<Payment_Workdone>();
            paymentWorkdones= _paymentWorkdoneRepository.GetAll().ToList();
            return paymentWorkdones;
        }
        public Payment_Workdone GetPaymentWorkdone(int workdoneid)
        {
            Payment_Workdone paymentWorkdone=new Payment_Workdone();
            paymentWorkdone= _paymentWorkdoneRepository.Get(workdoneid);
            return paymentWorkdone;
        }

        public void CreatePaymentWorkdone(Payment_Workdone payment_Workdone)
        {
            _paymentWorkdoneRepository.Insert(payment_Workdone);
        }

        public void DeletePaymentWorkdone(int Id)
        {
            var paymentWorkdone = _paymentWorkdoneRepository.Get(Id);
            _paymentWorkdoneRepository.Delete(paymentWorkdone);
        }

        public void UpdatePaymentWorkdone(Payment_Workdone payment_Workdone)
        {
            throw new NotImplementedException();
        }

        public void  Create(Payment_History paymentHistory)
        {
            _paymentHistoryRepository.Insert(paymentHistory);
        }

        public void Update(Payment_History paymentHistory)
        {
            _paymentHistoryRepository.Update(paymentHistory);
        }
        public void Delete(long id)
        {
            var payment= _paymentHistoryRepository.Get(id);
            _paymentHistoryRepository.Delete(payment);
        }
        public List<Payment_History> GetAll(long patientId)
        {
           return _paymentHistoryRepository.GetAll().Where(x=>x.Patient_Id== patientId).ToList();
        }
        public Payment_History Get(long id)
        {
          return  _paymentHistoryRepository.Get(id);
        }

        public void CreateReceivePayment(Payment_Details_List payment_Details_List)
        {
            _paymentDetailsListRepository.Insert(payment_Details_List);
        }
        public List<Payment_Details_List> GetReceivedPayment(long paymentId)
        {
            List<Payment_Details_List> receivedList=new List<Payment_Details_List>();
            receivedList= _paymentDetailsListRepository.GetAll().Where(x=>x.Payment_History_Id== paymentId).ToList();
            return receivedList;
        }

    }
}
