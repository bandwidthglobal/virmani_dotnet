using DCRM.Common.Entity;
using DCRM.Common;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.Repository
{
    public class LoginRepository : ILoginRepository
    {
        public readonly DCRMDBContext _contex;
        public LoginRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }


        public User UserAuthenticate(AuthenticateRequest authenticateRequest)
        {
            var user = _contex.Users.SingleOrDefault(x => x.Status == 1 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);
            return user;

        }
        public Patientse PatientAuthenticate(AuthenticateRequest authenticateRequest)
        {
            var patientse = _contex.Patientses.SingleOrDefault(x => x.Is_Delete == 0 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);
            return patientse;
        }
        public Staff StaffAuthenticate(AuthenticateRequest authenticateRequest)
        {
            var patientse = _contex.Staffs.SingleOrDefault(x => x.Is_Deleted == 0 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);
            return  patientse;
        }
        public Doctor DoctorAuthenticate(AuthenticateRequest authenticateRequest)
        {
            var doctor = _contex.Doctors.SingleOrDefault(x => x.Is_Delete == 0 && x.Email == authenticateRequest.Email && x.Password == authenticateRequest.Password);
            return doctor;
        }
    }
}
