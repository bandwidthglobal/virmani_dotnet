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
        //public DbSet<RequestUser> Users { get; set; }
        public DbSet<User> Users { get; set; }
        //public DbSet<LoginModel>? LoginModels { get; set; }
    }
}
