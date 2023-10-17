using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Demo_Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
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
        private readonly IRepository<Workdone_New> _workDoneRepository;
        private readonly IRepository<Treatmentplans> _treatmentRepository;
        private readonly IRepository<Doctor> _doctorRepository;
        private readonly IRepository<Teethinfo> _teethInfoRepository;
        private readonly IRepository<Teeth> _teethRepository;
        private readonly IRepository<Patientse> _patientRepository;
        public PaymentService(IRepository<Payment_History> paymentHistoryRepository
            , IRepository<Payment_Workdone> paymentWorkdoneRepository
            , IRepository<Payment_Details_List> paymentDetailsListRepository
            , IRepository<Workdone_New> workDoneRepository
            , IRepository<Treatmentplans> treatmentRepository
            , IRepository<Doctor> doctorRepository
            , IRepository<Teethinfo> teethInfoRepository
            , IRepository<Patientse> patientRepository,
IRepository<Teeth> teethRepository)
        {
            _paymentHistoryRepository = paymentHistoryRepository;
            _paymentWorkdoneRepository = paymentWorkdoneRepository;
            _paymentDetailsListRepository = paymentDetailsListRepository;
            _workDoneRepository = workDoneRepository;
            _treatmentRepository = treatmentRepository;
            _doctorRepository = doctorRepository;
            _teethInfoRepository = teethInfoRepository;
            _patientRepository = patientRepository;
            _teethRepository = teethRepository; 
        }

        public List<Payment_Workdone> GetPaymentWorkdones(int workdoneid)
        {
            List<Payment_Workdone> paymentWorkdones = new List<Payment_Workdone>();
            paymentWorkdones = _paymentWorkdoneRepository.GetAll().ToList();
            return paymentWorkdones;
        }
        public Payment_Workdone GetPaymentWorkdone(int workdoneid)
        {
            Payment_Workdone paymentWorkdone = new Payment_Workdone();
            paymentWorkdone = _paymentWorkdoneRepository.Get(workdoneid);
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

        public void Create(Payment_History paymentHistory)
        {
            _paymentHistoryRepository.Insert(paymentHistory);
        }

        public void Update(Payment_History paymentHistory)
        {
            _paymentHistoryRepository.Update(paymentHistory);
        }
        public void Delete(long id)
        {
            var payment = _paymentHistoryRepository.Get(id);
            _paymentHistoryRepository.Delete(payment);
        }
        public List<Payment_History> GetAll(long patientId)
        {
            return _paymentHistoryRepository.GetAll().Where(x => x.Patient_Id == patientId).ToList();
        }
        public Payment_History Get(long id)
        {
            return _paymentHistoryRepository.Get(id);
        }

        public void CreateReceivePayment(Payment_Details_List payment_Details_List)
        {
            var paymentHistory = _paymentHistoryRepository.Get(payment_Details_List.Payment_History_Id);
            if (paymentHistory != null)
            {
                payment_Details_List.Created_At = DateTime.Now;
                payment_Details_List.Updated_At = DateTime.Now;
                _paymentDetailsListRepository.Insert(payment_Details_List);
                paymentHistory.Balance = paymentHistory.Balance - payment_Details_List.Price;
                paymentHistory.Credit_Amount = paymentHistory.Credit_Amount + payment_Details_List.Price;
                _paymentHistoryRepository.Update(paymentHistory);
            }


        }
        public List<Payment_Details_List> GetReceivedPayment(long paymentId)
        {
            List<Payment_Details_List> receivedList = new List<Payment_Details_List>();
            receivedList = _paymentDetailsListRepository.GetAll().Where(x => x.Payment_History_Id == paymentId).ToList();
            return receivedList;
        }

        public List<PaymentReportDto> GetPaymentReportList(long userId)
        {
            List<PaymentReportDto> paymentReportList = new List<PaymentReportDto>();
            var lnquery = from w in _workDoneRepository.GetAll().ToList()
                          join t in _treatmentRepository.GetAll().ToList() on w.Treatment_Id equals t.Id
                          join d in _doctorRepository.GetAll().ToList() on w.Doctor_Id equals d.Id
                          join ti in _teethInfoRepository.GetAll().ToList() on t.Id equals ti.Treatmentplans_Id
                          join te in _teethRepository.GetAll().ToList() on ti.Teeth_Id equals te.Id
                          join p in _patientRepository.GetAll().ToList() on t.Patient_Id equals p.Id
                          join ph in _paymentHistoryRepository.GetAll().ToList() on w.Id equals ph.Workdone_Id
                          where p.User_Id == userId
                          select new
                          {
                              Id = ph.Id,
                              TeethId = ti.Teeth_Id,
                              ToothName = te.Teeth_Note,
                              WorkDoneDate = w.Created_At,
                              DoctorName = d.Name,
                              TreatementCode = t.Job,
                              NoteDiagnosis = ti.Toth_Note,
                              PatientName = p.Name,
                              PaidAmount = ph.Credit_Amount
                          };


            foreach (var item in lnquery.ToList())
            {
                PaymentReportDto paymentReport = new PaymentReportDto();
                paymentReport.Id = item.Id;
                paymentReport.ToothName = "(" + item.TeethId + ") " + item.ToothName; ;
                paymentReport.WorkDoneDate = item.WorkDoneDate;
                paymentReport.DoctorName = item.DoctorName;
                paymentReport.TreatementCode = item.TreatementCode;
                paymentReport.NoteDiagnosis = item.NoteDiagnosis;
                paymentReport.PatientName = item.PatientName;
                paymentReport.PaidAmount = item.PaidAmount;
                paymentReportList.Add(paymentReport);
            }
            return paymentReportList;

        }
        public PaymentReportDto GetPaymentReport(long paymentId)
        {
            PaymentReportDto paymentReport = new PaymentReportDto();
            var paymentHistory = _paymentHistoryRepository.Get(paymentId);
            if (paymentHistory != null)
            {
                paymentReport.TotalAmount = paymentHistory.Debit_Amount;
                paymentReport.PaidAmount = paymentHistory.Credit_Amount;
                paymentReport.Balance = paymentHistory.Balance;
                var workDone = _workDoneRepository.Get(paymentHistory.Workdone_Id);
                var lnquery = (from w in _workDoneRepository.GetAll().ToList()
                               join t in _treatmentRepository.GetAll().ToList() on w.Treatment_Id equals t.Id
                               join d in _doctorRepository.GetAll().ToList() on w.Doctor_Id equals d.Id
                               join ti in _teethInfoRepository.GetAll().ToList() on t.Id equals ti.Treatmentplans_Id
                               join te in _teethRepository.GetAll().ToList() on ti.Teeth_Id equals te.Id
                               join p in _patientRepository.GetAll().ToList() on t.Patient_Id equals p.Id
                               select new
                               {
                                   TeethId=ti.Teeth_Id,
                                   ToothName = te.Teeth_Note,
                                   WorkDoneDate = w.Created_At,
                                   DoctorName = d.Name,
                                   TreatementCode = t.Job,
                                   NoteDiagnosis = ti.Toth_Note,
                                   PatientName = p.Name
                               }).FirstOrDefault();
                if (lnquery != null)
                {
                    paymentReport.ToothName ="("+ lnquery.TeethId +") "+ lnquery.ToothName;
                    paymentReport.WorkDoneDate = lnquery.WorkDoneDate;
                    paymentReport.DoctorName = lnquery.DoctorName;
                    paymentReport.TreatementCode = lnquery.TreatementCode;
                    paymentReport.NoteDiagnosis = lnquery.NoteDiagnosis;
                    paymentReport.PatientName = lnquery.PatientName;
                }
                var paymentDetilList = _paymentDetailsListRepository.GetAll().Where(x => x.Payment_History_Id == paymentId);
                List<Payment_Details_List> paymentDetailsList = new List<Payment_Details_List>();
                foreach (var payment in paymentDetilList)
                {
                    Payment_Details_List paymentDetails = new Payment_Details_List();
                    paymentDetails.Created_At = payment.Created_At;
                    paymentDetails.Payment_Type = payment.Payment_Type;
                    paymentDetails.Price = payment.Price;
                    paymentDetails.Description = payment.Description;
                    paymentDetailsList.Add(paymentDetails);
                }
                paymentReport.PaymentDetailsList = paymentDetailsList;
            }
            return paymentReport;
        }
    }
}
