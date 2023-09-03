using DCRM.Common;
using DCRM.Common.Entity;

using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.Database
{
    public class DCRMDBContext:DbContext
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

        public DbSet<PatientScan> Patient_Scans { get; set; }

        public DbSet<PatientsContact> Patients_Contact { get; set; }

        public DbSet<PatientsInsuranceLoan> Patients_Insurance_Loan { get; set; }

        public DbSet<PatientTest> Patient_Tests { get; set; }

        public DbSet<Drug> Drugs { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        public DbSet<Prescription> Prescription { get; set; }

    }
}
