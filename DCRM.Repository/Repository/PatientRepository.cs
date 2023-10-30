using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Utilities.Encoders;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Data;
using System.Data.SqlTypes;
using System.Reflection;

namespace DCRM.Repository.Repository
{
    public class PatientRepository : IPatientRepository
    {

        public readonly DCRMDBContext _contex;
        public PatientRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }

        /// <summary>
        /// User authenticate and return token for other request
        /// </summary>
        /// <param name="authenticateRequest"></param>
        /// <returns></returns>
        public async Task<Patientse> AuthenticateAsync(AuthenticateRequest authenticateRequest)
        {
            var patient = await _contex.Patientses.SingleOrDefaultAsync(x => x.Is_Delete == 0 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);

            return patient;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="changePasswordModel"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public void ChangePatientPassword(ChangePasswordRequest changePasswordModel)
        {
            if (changePasswordModel.Type.ToLower() == "patient")
            {
                var patient = _contex.Patientses.FirstOrDefault(x => x.Id == changePasswordModel.Id && x.Is_Delete == 0);
                if (patient != null)
                {
                    patient.Password = changePasswordModel.NewPassword;
                    _contex.Update(patient);
                    _contex.SaveChanges();
                }
                else { throw new KeyNotFoundException("no record found"); }
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public IEnumerable<Patientse> GetAll()
        {
            IEnumerable<Patientse> patients = _contex.Patientses.Where(x => x.Is_Delete == 0);
            if (patients != null)
            {
                return patients;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }

        public Patientse Get(long id)
        {
            Patientse? patient = _contex.Patientses.Where(x => x.Is_Delete == 0 && x.Id == id).FirstOrDefault();
            return patient;

        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<Patientse> GetByUserId(int userId)
        {
            List<Patientse> patients = _contex.Patientses.Where(x => x.Is_Delete == 0 && x.User_Id == userId).ToList();
            if (patients != null)
            {
                return patients;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<PatientsContact> GetPatientsContacteDetailList(int patientId)
        {
            List<PatientsContact> patientsContacts = _contex.Patients_Contact.Where(x => x.Patient_Id == patientId).ToList();
            if (patientsContacts != null)
            {
                return patientsContacts;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<PatientsInsuranceLoan> GetPatientsInsuranceLoanDetailList(int patientId)
        {
            List<PatientsInsuranceLoan> patientsInsuranceLoans = _contex.Patients_Insurance_Loan.Where(x => x.Patients_Id == patientId).ToList();
            if (patientsInsuranceLoans != null)
            {
                return patientsInsuranceLoans;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
        /// <summary>
        /// get patient test list
        /// </summary>
        /// <param name="patientId"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public List<Patient_Scans> GetPatientScanList(int patientId)
        {
            List<Patient_Scans> patientScan = _contex.Patient_Scans.Where(x => x.Patient_Id == patientId).ToList();
            if (patientScan != null)
            {
                return patientScan;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
        public List<PatientTest> GetPatientTestList(int patientId)
        {
            List<PatientTest> PatientTests = _contex.Patient_Tests.Where(x => x.Patient_Id == patientId).ToList();
            if (PatientTests != null)
            {
                return PatientTests;
            }
            else { throw new KeyNotFoundException("no record found"); }
        }
        /// <summary>
        /// create patient
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public long Create(PatientRequest request)
        {


            Patientse patient = new Patientse();
            long phone = Convert.ToInt64(request.PatientContacts[0].Phone1);
            var contactDetails = _contex.Patients_Contact.FirstOrDefault(x => x.Phone1 == phone);
            if (contactDetails == null)
            {
                _contex.Database.BeginTransaction();
                try
                {
                    patient.Chamber_Id = request.Chamber_Id == null ? "123456" : request.Chamber_Id;
                    patient.Mr_Number = request.Mr_Number == null ? "123456" : request.Mr_Number;
                    patient.Name = request.Name;
                    patient.User_Id = request.User_Id;
                    patient.Slug = request.Slug;
                    patient.Thumb = request.Thumb;
                    patient.Email = request.Email == null ? phone + "@virmani.com" : request.Email;
                    patient.Mobile = phone.ToString();
                    patient.Age = request.Age;
                    patient.Weight = request.Weight;
                    patient.Sex = request.Sex;
                    patient.Title = request.Title;
                    patient.Role = "Patient";
                    patient.Guardian = request.Guardian;
                    patient.Present_Address = request.Present_Address;
                    patient.Permanent_Address = request.Permanent_Address;
                    patient.Created_At = System.DateTime.UtcNow;
                    _contex.Patientses.Add(patient);
                    _contex.SaveChanges();

                    if (request.PatientContacts != null && request.PatientContacts.Count > 0)
                    {
                        foreach (var item in request.PatientContacts)
                        {
                            var contact = _contex.Patients_Contact.FirstOrDefault(x => x.Id == item.Id);
                            if (contact == null)
                            {
                                item.Created_At = System.DateTime.Now;
                                item.Updated_At
                                    = System.DateTime.Now;
                                item.Patient_Id = patient.Id;
                                item.Relationship_Type = item.Relationship_Type==null? "Relationship" : item.Relationship_Type;
                                if (string.IsNullOrEmpty(item.Address_O))
                                {
                                    item.Address_O = string.Empty;
                                }
                                _contex.Patients_Contact.Add(item);
                            }
                            _contex.SaveChanges();
                        }
                    }
                    if (request.PatientInsuranceLoans != null && request.PatientInsuranceLoans.Count > 0)
                    {
                        foreach (var item in request.PatientInsuranceLoans)
                        {
                            var insuranceLoan = _contex.Patients_Insurance_Loan.FirstOrDefault(x => x.Id == item.Id);
                            if (insuranceLoan == null)
                            {
                                item.Patients_Id = patient.Id;
                                item.Created_At = System.DateTime.Now;
                                item.Updated_At
                                    = System.DateTime.Now;
                                _contex.Patients_Insurance_Loan.Add(item);
                            }
                            _contex.SaveChanges();
                        }
                    }
                    //if (request.PatientScans != null && request.PatientScans.Count > 0)
                    //{
                    //    foreach (var item in request.PatientScans)
                    //    {
                    //        var patientScan = _contex.Patient_Scans.FirstOrDefault(x => x.Id == item.Id);
                    //        if (patientScan == null)
                    //        {
                    //            item.Patient_Id = patient.Id;
                    //            item.Created_At = System.DateTime.Now;
                    //            item.Updated_At
                    //                = System.DateTime.Now;
                    //            _contex.Patient_Scans.Add(item);
                    //        }
                    //        _contex.SaveChanges();
                    //    }
                    //}
                    //if (request.PatientTests != null && request.PatientTests.Count > 0)
                    //{
                    //    foreach (var item in request.PatientTests)
                    //    {
                    //        var patientTest = _contex.Patient_Tests.FirstOrDefault(x => x.Id == item.Id);
                    //        if (patientTest == null)
                    //        {
                    //            item.Patient_Id = patient.Id;
                    //            item.Created_At = System.DateTime.Now;
                    //            item.Updated_At
                    //                = System.DateTime.Now;
                    //            _contex.Patient_Tests.Add(item);
                    //        }
                    //        _contex.SaveChanges();
                    //    }
                    //}
                    _contex.Database.CommitTransaction();
                    return patient.Id;
                }
                catch (Exception ex)
                {
                    _contex.Database.RollbackTransaction();
                    throw new Exception(ex.Message);
                }
            }
            else
            {
                throw new SqlAlreadyFilledException("phone is already exist");
            }

        }

        /// <summary>
        /// update patient
        /// </summary>
        /// <param name="request"></param>
        /// <exception cref="NotImplementedException"></exception>
        public void Update(PatientRequest request)
        {
            string phone = request.PatientContacts[0].Phone1.ToString();
            Patientse patient = _contex.Patientses.FirstOrDefault(x => x.Id == request.Id);
            if (patient != null)
            {
                patient.Chamber_Id = request.Chamber_Id == null ? patient.Chamber_Id : request.Chamber_Id;
                patient.UserName = request.User_name;
                patient.Mr_Number = request.Mr_Number == null ? patient.Mr_Number : request.Mr_Number;
                patient.Name = request.Name;
                patient.UserName = request.User_name;
                patient.Slug = request.Slug;
                patient.Thumb = request.Thumb;
                patient.Email = request.Email == null ? patient.Email : request.Email;
                patient.Age = request.Age;
                patient.Weight = request.Weight;
                patient.Sex = request.Sex;
                patient.Title = request.Title;
                patient.Guardian = request.Guardian;
                patient.Present_Address = request.Present_Address;
                patient.Permanent_Address = request.Permanent_Address;
                patient.Created_At = System.DateTime.UtcNow;
                _contex.Patientses.Update(patient);
                _contex.SaveChanges();
                if (request.PatientContacts != null && request.PatientContacts.Count > 0)
                {
                    foreach (var item in request.PatientContacts)
                    {
                        var contact = _contex.Patients_Contact.FirstOrDefault(x => x.Id == item.Id);
                        if (contact == null)
                        {
                            item.Patient_Id = patient.Id;
                            _contex.Patients_Contact.Add(contact);
                        }
                        else
                        {
                            contact.Phone1 = item.Phone1;
                            contact.Phone2 = item.Phone2;
                            contact.Phone3 = item.Phone3;
                            contact.Phone4 = item.Phone4;
                            contact.Email = item.Email;
                            contact.Email2 = item.Email2;
                            contact.Address_R = item.Address_R;
                            contact.City_R = item.City_R;
                            contact.Zip_R = item.Zip_R;
                            contact.Country_R = item.Country_R;
                            contact.Address_O = item.Address_O;
                            contact.City_O = item.City_O;
                            contact.Zip_O = item.Zip_O;
                            contact.Country_O = item.Country_O;
                            contact.Address_Other = item.Address_Other;
                            contact.City_Other = item.City_Other;
                            contact.Zip_Other = item.Zip_Other;
                            contact.Country_Other = item.Country_Other;
                            contact.Physician = item.Physician;
                            contact.Reffered_By = item.Reffered_By;
                            contact.Doctor_Name = item.Doctor_Name;
                            contact.Phone = item.Phone;
                            contact.Relationship_Type = item.Relationship_Type;
                            contact.Medical_History_Allergies = item.Medical_History_Allergies;
                            contact.Special_Notes = item.Special_Notes;
                            contact.Updated_At = System.DateTime.UtcNow;
                            _contex.Patients_Contact.Update(contact);
                        }
                        _contex.SaveChanges();
                    }
                }
                if (request.PatientInsuranceLoans != null && request.PatientInsuranceLoans.Count > 0)
                {
                    foreach (var item in request.PatientInsuranceLoans)
                    {
                        var insuranceLoan = _contex.Patients_Insurance_Loan.FirstOrDefault(x => x.Id == item.Id);
                        if (insuranceLoan == null)
                        {
                            item.Patients_Id = patient.Id;
                            _contex.Patients_Insurance_Loan.Add(item);
                        }
                        else
                        {
                            insuranceLoan.Balance_Spent = item.Balance_Spent;
                            insuranceLoan.Balance_Amount = item.Balance_Amount;
                            insuranceLoan.Amount = item.Amount;
                            insuranceLoan.Name = item.Name;
                            insuranceLoan.Type = item.Type;
                            insuranceLoan.Updated_At = System.DateTime.UtcNow;
                            _contex.Patients_Insurance_Loan.Update(insuranceLoan);
                        }

                        _contex.SaveChanges();
                    }
                }
                //if (request.PatientScans != null && request.PatientScans.Count > 0)
                //{
                //    foreach (var item in request.PatientScans)
                //    {
                //        var patientScan = _contex.Patient_Scans.FirstOrDefault(x => x.Id == item.Id);
                //        if (patientScan == null)
                //        {
                //            item.Patient_Id = patient.Id;
                //            _contex.Patient_Scans.Add(item);
                //        }
                //        else
                //        {
                //            patientScan.Status = item.Status;
                //            patientScan.Report = item.Report;
                //            patientScan.Report_File = item.Report_File;
                //            patientScan.Scan_Name = item.Scan_Name;
                //            patientScan.Type = item.Type;
                //            patientScan.Updated_At = System.DateTime.UtcNow;
                //            _contex.Patient_Scans.Update(patientScan);
                //        }
                //        _contex.SaveChanges();
                //    }
                //}
                //if (request.PatientTests != null && request.PatientTests.Count > 0)
                //{
                //    foreach (var item in request.PatientTests)
                //    {
                //        var patientTest = _contex.Patient_Tests.FirstOrDefault(x => x.Id == item.Id);
                //        if (patientTest == null)
                //        {
                //            item.Patient_Id = patient.Id;
                //            _contex.Patient_Tests.Add(item);
                //        }
                //        else
                //        {
                //            patientTest.Status = item.Status;
                //            patientTest.Report = item.Report;
                //            patientTest.Report_File = item.Report_File;
                //            patientTest.Report_Date = item.Report_Date;
                //            patientTest.Test_Name = item.Test_Name;
                //            patientTest.Test_Price = item.Test_Price;
                //            patientTest.Updated_At = System.DateTime.UtcNow;
                //            _contex.Patient_Tests.Update(patientTest);
                //        }
                //        _contex.SaveChanges();
                //    }
                //}
            }
            else
            {
                throw new KeyNotFoundException("no record found");
            }
        }
        /// <summary>
        /// delete patient
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>

        public void Delete(long id)
        {
            var patient = _contex.Patientses.FirstOrDefault(x => x.Id == id);
            if (patient != null)
            {
                patient.Is_Delete = 1;
                _contex.Patientses.Update(patient);
                _contex.SaveChanges();
            }
        }

        public List<Patient_Scans> GetPatientScanList()
        {
            List<Patient_Scans> patientScans = new List<Patient_Scans>();
            patientScans = _contex.Patient_Scans.ToList();
            return patientScans;
        }
        public List<Lab_Data> GetPatientLabList()
        {
            List<Lab_Data> labdataList = new List<Lab_Data>();
            labdataList = _contex.Lab_Data.ToList();
            return labdataList;
        }

        public List<DropdownDataDto> NameList(long userId)
        {
            var patients = _contex.Patientses.Where(x => x.User_Id == userId).ToList();
            DropdownDataDto data = new DropdownDataDto();
            List<DropdownDataDto> dataList = new List<DropdownDataDto>();
            foreach (var patient in patients)
            {
                data = new DropdownDataDto();
                data.Id = patient.Id; data.Name = patient.Name; dataList.Add(data);
            }
            return dataList;
        }

        public ReferBy GetReferBy(long patientId)
        {
            ReferBy referBy = new ReferBy();
            var contact = _contex.Patients_Contact.FirstOrDefault(x => x.Patient_Id == patientId);
            if (contact != null)
            {
                referBy.RefferedBy = contact.Reffered_By;
                referBy.Name = contact.Doctor_Name;
                referBy.RelationshipType = contact.Relationship_Type;
            }
            return referBy;

        }


    }
}