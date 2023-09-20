using DCRM.Common.Entity;
using DCRM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Repository.IRepository
{
    public interface ILoginRepository
    {
        User UserAuthenticate(AuthenticateRequest authenticateRequest);

        Patientse PatientAuthenticate(AuthenticateRequest authenticateRequest);

        Staff StaffAuthenticate(AuthenticateRequest authenticateRequest);

        Doctor DoctorAuthenticate(AuthenticateRequest authenticateRequest);

    }
}
