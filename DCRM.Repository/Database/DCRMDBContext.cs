using Azure;
using DCRM.Common;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using Demo_Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Bcpg.Sig;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.Database
{
    public class DCRMDBContext : DbContext
    {
        public DCRMDBContext(DbContextOptions<DCRMDBContext> options) : base(options)
        { }

        public DbSet<User> Users { get; set; }

        public DbSet<Staff> Staffs { get; set; }

        public DbSet<StaffBankDetail> Staff_Bank_Details { get; set; }

        public DbSet<StaffInsuranceDetail> Staff_Insurance_Details { get; set; }

        public DbSet<StaffVaccination> Staff_Vaccination { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<DoctorsAddress> Doctors_Address { get; set; }

        public DbSet<DoctorsVaccination> Doctors_Vaccination { get; set; }

        public DbSet<DoctorBankDetail> Doctor_Bank_Details { get; set; }

        public DbSet<DoctorInsuranceDetail> Doctor_Insurance_Details { get; set; }

        public DbSet<Patientse> Patientses { get; set; }

        public DbSet<Dealer> Dealers { get; set; }

        public DbSet<DealerBankDetail> Dealer_Bank_Details { get; set; }

        public DbSet<DealerMaterial> Dealer_Material { get; set; }

        public DbSet<Patient_Scans> Patient_Scans { get; set; }

        public DbSet<PatientsContact> Patients_Contact { get; set; }

        public DbSet<PatientsInsuranceLoan> Patients_Insurance_Loan { get; set; }

        public DbSet<PatientTest> Patient_Tests { get; set; }

        public DbSet<Drug> Drugs { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        public DbSet<Prescription> Prescription { get; set; }

        public DbSet<Treatmentplans> Treatmentplans { get; set; }

        public virtual DbSet<Prosthesis_Type> Prosthesis_Type { get; set; }

        public virtual DbSet<Workdone_New> Workdone_New { get; set; }

        public virtual DbSet<Workdone> Workdone { get; set; }
        public virtual DbSet<Chair> Chairs { get; set; }

        public virtual DbSet<Chamber> Chamber { get; set; }

        public virtual DbSet<Lab_Data> Lab_Data { get; set; }

        public virtual DbSet<Teethinfo> Teethinfo { get; set; }

        public virtual DbSet<Payment> Payment { get; set; }

        public virtual DbSet<Payment_History> Payment_History { get; set; }

        public virtual DbSet<Payment_User> Payment_User { get; set; }

        public virtual DbSet<Payment_Workdone> Payment_Workdone { get; set; }

        public virtual DbSet<Payment_Details_List> Payment_Details_List { get; set; }

        public virtual DbSet<Partial_Payment> Partial_Payment { get; set; }

        public virtual DbSet<MedicineBrand> Medicine_Brand { get; set; }

        public virtual DbSet<MedicineCategory> Medicine_Category { get; set; }

        public virtual DbSet<Experience> Experiences { get; set; }

        public virtual DbSet<Assaign_Day> Assaign_Days { get; set; }

        public virtual DbSet<Assign_Time> Assign_Time { get; set; }

        public virtual DbSet<Userotp> Userotp { get; set; }

        public virtual DbSet<TeethCategory> Teeth_Category { get; set; }

        public virtual DbSet<Teeth> Teeth { get; set; }

        public virtual DbSet<MedicineBadStock> Medicine_Bad_Stock { get; set; }

        public virtual DbSet<MedicineBatchDetail> Medicine_Batch_Details { get; set; }

        public virtual DbSet<DiagnosisData> Diagnosis_Data { get; set; }

    }
}
