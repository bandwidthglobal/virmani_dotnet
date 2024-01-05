using DCRM.Common.Entity;
using DCRM.Common;

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
