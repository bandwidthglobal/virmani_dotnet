using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entities;
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
    public interface IAppointmentService
    {
        Task<IEnumerable<Appointment>> GetAllAsync();

        Task<Appointment> GetByIdAsync(int id);

        Task<IEnumerable<Appointment>> GetByUserId(int userId);

        List<Appointment> GetByPatientId(int userId, int patientId);

        Task CreateAsync(Appointment request);

        void Update(Appointment request);

        Task DeleteAsync(int id);

    }
}
