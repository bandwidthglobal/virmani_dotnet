using DCRM.Common;

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
