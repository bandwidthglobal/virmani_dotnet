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

    }
}
