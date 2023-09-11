using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Repository.Repository;
using DCRM.Service.IService;
using Demo_Api.Models;
using Microsoft.Extensions.Configuration;

namespace DCRM.Service.Service
{
    public class PatientService : IPatientService
    {
        #region Variables
        public readonly IPatientRepository _patientRepository;
        public readonly IJwtUtils _jwtUtils;
        public readonly IConfiguration _configuration;
        public readonly IDoctorRepository _doctorRepository;
        public readonly IRepository<Prosthesis_Type> _prosthesisRepository;
        public readonly IRepository<Workdone_New> _workdoneNewRepository;
        public readonly IRepository<Treatmentplans> _treatmentplansRepository;
        public readonly IRepository<Teethinfo> _teethinfoRepository;
        public readonly IRepository<Workdone> _workdoneRepository;
        public readonly IRepository<Payment_History> _paymentHistoryRepository;
        public readonly IRepository<Payment_Details_List> _paymentDetailsRepository;
        #endregion

        #region Constructor 
        public PatientService(IPatientRepository patientRepository, IJwtUtils jwtUtils,
            IConfiguration configuration, IDoctorRepository doctorRepository,
            IRepository<Prosthesis_Type> prosthesisRepository,
            IRepository<Workdone_New> workdoneNewRepository,
            IRepository<Treatmentplans> treatmentplansRepository
            , IRepository<Teethinfo> teethinfoRepository
            , IRepository<Workdone> workdoneRepository, IRepository<Payment_History> paymentHistoryRepository, IRepository<Payment_Details_List> paymentDetailsRepository)
        {
            _patientRepository = patientRepository;
            _jwtUtils = jwtUtils;
            _configuration = configuration;
            _doctorRepository = doctorRepository;
            _prosthesisRepository = prosthesisRepository;
            _workdoneNewRepository = workdoneNewRepository;
            _treatmentplansRepository = treatmentplansRepository;
            _teethinfoRepository = teethinfoRepository;
            _workdoneRepository = workdoneRepository;
            _paymentHistoryRepository = paymentHistoryRepository;
            _paymentDetailsRepository = paymentDetailsRepository;
        }
        #endregion

        /// <summary>
        /// User authenticate and return token for other request
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        /// <exception cref="AppException"></exception>
        public async Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest request)
        {
            request.Password = EncryptionDecryptionUsingSymmetricKey.EncryptString(_configuration.GetSection("PasswordHasKey").Value, request.Password);
            var patient = await _patientRepository.AuthenticateAsync(request);
            if (patient == null)
                throw new AppException("username or password is incorrect");

            var jwtToken = _jwtUtils.GenerateJwtToken(patient.Id, patient.Email, patient.Role, patient.Email);
            return new AuthenticateResponse(patient.Email, patient.Id, patient.Role, jwtToken);
        }

        /// <summary>
        /// ftech all user active user
        /// </summary>
        /// <returns></returns>
        public async Task<List<PatientseDto>> GetAllAsync()
        {

            var patients = await _patientRepository.GetAllAsync();
            PatientseDto patientseDto = new PatientseDto();
            List<PatientseDto> patientList = new List<PatientseDto>();
            foreach (var patient in patients.ToList())
            {
                patientseDto = new PatientseDto();
                patientseDto.Id = patient.Id;
                patientseDto.Chamber_Id = patient.Chamber_Id;
                patientseDto.User_name = patient.UserName;
                patientseDto.Mr_Number = patient.Mr_Number;
                patientseDto.Name = patient.Name;
                patientseDto.User_name = patient.UserName;
                patientseDto.Slug = patient.Slug;
                patientseDto.Thumb = patient.Thumb;
                patientseDto.Email = patient.Email;
                patientseDto.Age = patient.Age;
                patientseDto.Weight = patient.Weight;
                patientseDto.Sex = patient.Sex;
                patientseDto.Title = patient.Title;
                patientseDto.Guardian = patient.Guardian;
                patientseDto.Present_Address = patient.Present_Address;
                patientseDto.Permanent_Address = patient.Permanent_Address;
                patientseDto.Created_At = System.DateTime.UtcNow;
                patientseDto.PatientInsuranceLoans = _patientRepository.GetPatientsInsuranceLoanDetailList(patient.Id);
                patientseDto.PatientTests = _patientRepository.GetPatientTestList(patient.Id);
                patientseDto.PatientContacts = _patientRepository.GetPatientsContacteDetailList(patient.Id);
                patientseDto.PatientScans = _patientRepository.GetPatientScanList(patient.Id);
                patientList.Add(patientseDto);
            }
            return patientList;
        }

        /// <summary>
        /// fetch satff by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<PatientseDto> GetByIdAsync(int id)
        {
            var patient = await _patientRepository.GetByIdAsync(id);
            PatientseDto patientdto = new PatientseDto();
            patientdto.Id = patient.Id;
            patientdto.Chamber_Id = patient.Chamber_Id;
            patientdto.User_name = patient.UserName;
            patientdto.Mr_Number = patient.Mr_Number;
            patientdto.Name = patient.Name;
            patientdto.User_name = patient.UserName;
            patientdto.Slug = patient.Slug;
            patientdto.Thumb = patient.Thumb;
            patientdto.Email = patient.Email;
            patientdto.Age = patient.Age;
            patientdto.Weight = patient.Weight;
            patientdto.Sex = patient.Sex;
            patientdto.Title = patient.Title;
            patientdto.Guardian = patient.Guardian;
            patientdto.Present_Address = patient.Present_Address;
            patientdto.Permanent_Address = patient.Permanent_Address;
            patientdto.Created_At = System.DateTime.UtcNow;
            patientdto.PatientInsuranceLoans = _patientRepository.GetPatientsInsuranceLoanDetailList(patient.Id);
            patientdto.PatientTests = _patientRepository.GetPatientTestList(patient.Id);
            patientdto.PatientContacts = _patientRepository.GetPatientsContacteDetailList(patient.Id);
            patientdto.PatientScans = _patientRepository.GetPatientScanList(patient.Id);
            return patientdto;
        }


        /// <summary>
        /// fetch satff by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<PatientseDto> GetByUserIdAsync(int userid)
        {
            var patients = _patientRepository.GetByUserId(userid);
            PatientseDto patientseDto = new PatientseDto();
            List<PatientseDto> patientList = new List<PatientseDto>();
            foreach (var patient in patients)
            {
                patientseDto = new PatientseDto();
                patientseDto.Id = patient.Id;
                patientseDto.Chamber_Id = patient.Chamber_Id;
                patientseDto.User_name = patient.UserName;
                patientseDto.Mr_Number = patient.Mr_Number;
                patientseDto.Name = patient.Name;
                patientseDto.User_name = patient.UserName;
                patientseDto.Slug = patient.Slug;
                patientseDto.Thumb = patient.Thumb;
                patientseDto.Email = patient.Email;
                patientseDto.Age = patient.Age;
                patientseDto.Weight = patient.Weight;
                patientseDto.Sex = patient.Sex;
                patientseDto.Title = patient.Title;
                patientseDto.Guardian = patient.Guardian;
                patientseDto.Present_Address = patient.Present_Address;
                patientseDto.Permanent_Address = patient.Permanent_Address;
                patientseDto.Created_At = System.DateTime.UtcNow;
                patientseDto.PatientInsuranceLoans = _patientRepository.GetPatientsInsuranceLoanDetailList(patient.Id);
                patientseDto.PatientTests = _patientRepository.GetPatientTestList(patient.Id);
                patientseDto.PatientContacts = _patientRepository.GetPatientsContacteDetailList(patient.Id);
                patientseDto.PatientScans = _patientRepository.GetPatientScanList(patient.Id);
                patientList.Add(patientseDto);
            }
            return patientList;
        }

        /// <summary>
        /// create patient
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public void CreateAsync(PatientRequest request)
        {
             _patientRepository.CreateAsync(request);
        }
        /// <summary>;
        /// 
        /// update user 
        /// </summary>
        /// <param name="userUpdateRequestModel"></param>
        /// <returns></returns>
        /// <exception cref="KeyNotFoundException"></exception>
        public void Update(PatientRequest request)
        {
            _patientRepository.Update(request);
        }
        /// <summary>
        /// remove user by user id from users table
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task DeleteAsync(int id)
        {
            await _patientRepository.DeleteAsync(id);
        }

        /// <summary>
        /// change password according type
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        public async Task ChangePasswordAsync(ChangePasswordRequest changePasswordModel)
        {
            await _patientRepository.ChangePatientPasswordAsync(changePasswordModel);
        }

        /// <summary>
        /// get patient scan list
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<PatientScan> GetPatientScan(int patientId)
        {
            List<PatientScan> patientScans = new List<PatientScan>();
            patientScans = _patientRepository.GetPatientScanList().Where(x => x.Patient_Id == patientId).ToList();
            return patientScans;
        }
        /// <summary>
        /// get patient labdata liat
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<LabDataDto> GetPatientLabData(int patientId)
        {
            List<LabData> labDataList = new List<LabData>();
            List<LabDataDto> labDatas = new List<LabDataDto>();
            labDataList = _patientRepository.GetPatientLabList().Where(x => x.Patient_Id == patientId).ToList();
            foreach (var item in labDataList)
            {
                LabDataDto labData = new LabDataDto();
                labData.Id = item.Id;
                labData.Doctor_Id = item.Doctor_Id;
                labData.Patient_Id = item.Patient_Id;
                labData.Treatment_Id = item.Treatment_Id;
                labData.Workdone_Id = item.Workdone_Id;
                labData.Due_Date = item.Due_Date;
                var Prosthesis_Type = _prosthesisRepository.Get(Convert.ToInt32(item.Prosthesis_Type));
                if (Prosthesis_Type != null)
                {
                    labData.Prosthesis_Type = Prosthesis_Type.Name;
                }
                labData.Lab_Instructions = item.Lab_Instructions;
                labData.Arch = item.Arch;
                labData.Teeth_Number = item.Teeth_Number;
                labData.Impression_Date = item.Impression_Date;
                labData.Shade = item.Shade;
                labData.Send_Date = item.Send_Date;
                labData.Laboratory_Name = item.Laboratory_Name;
                labData.Notes = item.Notes;
                labData.DoctorName = _doctorRepository.GetDoctorByIdAsync(Convert.ToInt32(item.Doctor_Id)).Result.Name;
                labDatas.Add(labData);
            }
            return labDatas;
        }

        /// <summary>
        /// fetch patient treatmentplans
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<TreatmentplanDto> GetPatientTreatmentplanList(int patientId)
        {
            List<TreatmentplanDto> treatmentplanDtos = new List<TreatmentplanDto>();
            var treatmentplans = _treatmentplansRepository.GetAll().Where(x => x.Patient_Id == patientId).ToList();
            foreach (var treatment in treatmentplans)
            {
                TreatmentplanDto treatmentplanDto = new TreatmentplanDto();
                treatmentplanDto.Id = treatment.Id;
                treatmentplanDto.JobId = treatment.Job_Id;
                treatmentplanDto.PatientId = treatment.Patient_Id;
                treatmentplanDto.Doctor = treatment.Doctor;
                treatmentplanDto.Amount = treatment.Amount;
                treatmentplanDto.CreatedAt = treatment.Created_At;
                treatmentplanDto.UpdatedAt = treatment.Updated_At;
                treatmentplanDto.Courtesy = treatment.Courtesy;
                treatmentplanDto.TreatmentStatus = treatment.Treatment_Status;
                treatmentplanDto.Status = treatment.Status;
                var workDoneNew = _workdoneNewRepository.GetAll().Where(x => x.Treatment_Id == treatment.Id).FirstOrDefault();
                if (workDoneNew != null)
                {
                    treatmentplanDto.WorkDoneStatus = workDoneNew.Workdone_Status;
                }
                var teethInfo = _teethinfoRepository.GetAll().Where(x => x.Treatmentplans_Id == treatment.Id).FirstOrDefault();
                if (teethInfo != null)
                {
                    treatmentplanDto.Type = teethInfo.Type;
                    treatmentplanDto.TeethNumber = teethInfo.Teeth_Number_Note;
                    treatmentplanDto.TothNot = teethInfo.Toth_Note;
                    treatmentplanDto.Type = teethInfo.Type;
                }
                var doctor = _doctorRepository.GetDoctorsAsync().Result.ToList().Where(x => x.Id == treatment.Doctor).FirstOrDefault();
                if (doctor != null)
                {
                    treatmentplanDto.DoctorName = doctor.Name;
                }
                treatmentplanDtos.Add(treatmentplanDto);
            }
            return treatmentplanDtos;

        }

        /// <summary>
        /// fetch patien workdone list
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<WorkDoneDto> GetPatientWorkDoneList(int patientId)
        {
            List<WorkDoneDto> workdoneList = new List<WorkDoneDto>();
            var workdones = _workdoneRepository.GetAll().Where(x => x.Wk_Patient_Id == patientId).ToList();
            foreach (var workdone in workdones)
            {
                WorkDoneDto workDoneDto = new WorkDoneDto();
                workDoneDto.Id = workdone.Id;
                workDoneDto.ToothName = workdone.Print_Tooth_Name;
                workDoneDto.Notesdiagnosis = workdone.Notesdiagnosis;
                workDoneDto.AmtDueCurrentWork = workdone.Amt_Due_Current_Work;
                workDoneDto.WorkdoneStatus = workdone.Status;
                workDoneDto.WorkdoneStatus = workdone.Status;
                workDoneDto.ToothName = workdone.Print_Tooth_Name;
                workDoneDto.EstimatedAmount = workdone.Estimate;
                workDoneDto.Date = workdone.Workdone_Date;
                workDoneDto.Discount = workdone.Discount;
                var workDoneNew = _workdoneNewRepository.GetAll().Where(x => x.Id == workdone.Workdoneon_Id).FirstOrDefault();
                if (workDoneNew != null)
                {
                    workDoneDto.TotalAmt = workDoneNew.Total_Amt;
                    workDoneDto.CurrentWorkAmt = workDoneNew.Current_Work_Amt;
                    var treatment = _treatmentplansRepository.GetAll().Where(x => x.Id == workDoneNew.Treatment_Id).FirstOrDefault();
                    if (treatment != null)
                    {
                        workDoneDto.TreatmentCode = treatment.Job;
                        workDoneDto.Treatment_Id = treatment.Id;
                    }
                    var doctor = _doctorRepository.GetDoctorsAsync().Result.ToList().Where(x => x.Id == workDoneNew.Doctor_Id).FirstOrDefault();
                    if (doctor != null)
                    {
                        workDoneDto.DoctorName = doctor.Name;
                        workDoneDto.Doctor_Id = Convert.ToInt32(doctor.Id);
                    }
                }
                workdoneList.Add(workDoneDto);
            }
            return workdoneList;

        }

        /// <summary>
        /// fetch patient payment list
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        public List<PaymentHistoryDto> GetPatientpaymentList(int patientId)
        {
            List<PaymentHistoryDto> paymentList = new List<PaymentHistoryDto>();
            var payments = _paymentHistoryRepository.GetAll().Where(x => x.Patient_Id == patientId).ToList();
            foreach (var item in payments)
            {
                PaymentHistoryDto paymentHistoryDto = new PaymentHistoryDto();
                paymentHistoryDto.Id = item.Id;
                paymentHistoryDto.Date = Convert.ToString(item.Created_At);
                paymentHistoryDto.Description = item.Description;
                paymentHistoryDto.Balance = item.Balance;
                paymentHistoryDto.DebitAmount = item.Debit_Amount;
                paymentHistoryDto.CreditAmount = item.Credit_Amount;
                paymentHistoryDto.WorkdoneId = item.Workdone_Id;
                paymentHistoryDto.PatientId = item.Patient_Id;
                paymentHistoryDto.DoctorId = item.Doctor_Id;
                var doctor = _doctorRepository.GetDoctorsAsync().Result.ToList().Where(x => x.Id == item.Doctor_Id).FirstOrDefault();
                if (doctor != null)
                {
                    paymentHistoryDto.DoctorName = doctor.Name;
                    paymentHistoryDto.DoctorId = Convert.ToInt32(doctor.Id);
                }
                var workDoneNew = _workdoneNewRepository.GetAll().Where(x => x.Id == item.Workdone_Id).FirstOrDefault();
                if (workDoneNew != null)
                {
                    var treatment = _treatmentplansRepository.GetAll().Where(x => x.Id == workDoneNew.Treatment_Id).FirstOrDefault();
                    if (treatment != null)
                    {
                        paymentHistoryDto.ToothCode = treatment.Job;
                    }
                }
                paymentList.Add(paymentHistoryDto);
            }
            return paymentList;

        }

    }
}