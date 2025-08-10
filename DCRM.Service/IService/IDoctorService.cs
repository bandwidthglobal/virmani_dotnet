using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;

namespace DCRM.Service.IService
{
    public interface IDoctorService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest authenticateRequest);
        IEnumerable<DoctorDto> GetAll();
         DoctorDto Get(long id);
        void Create(DoctorRequest request);
        void Update(DoctorRequest request);
        void Delete(long id);
        void ChangePassword(ChangePasswordRequest changePasswordModel);
        List<DoctorDto> GetDoctorsByUserId(int userId);
        List<DropdownDataDto> NameList(long userId);
    }
}
