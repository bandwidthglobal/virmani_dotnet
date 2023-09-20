using DCRM.Common;
using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface ILoginService
    {
        AuthenticateResponse UserAuthenticate(AuthenticateRequest authenticateRequest);

        AuthenticateResponse PatientAuthenticate(AuthenticateRequest authenticateRequest);

        AuthenticateResponse StaffAuthenticate(AuthenticateRequest authenticateRequest);

        AuthenticateResponse DoctorAuthenticate(AuthenticateRequest authenticateRequest);
    }
}
