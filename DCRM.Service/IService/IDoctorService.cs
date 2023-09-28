using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IDoctorService
    {
        Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest authenticateRequest);
        Task<IEnumerable<DoctorDto>> GetDoctorsAsync();
         Task<DoctorDto> GetDoctorByIdAsync(int id);
        //Task SaveDoctorAsync(DoctorRequest request);
        Task CreateDoctorAsync(DoctorRequest request);
        void UpdateDoctor(DoctorRequest request);
        void DeleteDoctor(int id);
        Task ChangeDoctorPasswordAsync(ChangePasswordRequest changePasswordModel);
        List<DoctorDto> GetDoctorsByUserId(int userId);
        List<DropdownDataDto> NameList(long userId);
    }
}
