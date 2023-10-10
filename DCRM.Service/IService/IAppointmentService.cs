using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entities;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using Demo_Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service.IService
{
    public interface IAppointmentService
    {
        IEnumerable<Appointment> GetAll(long userId,string role);

        Appointment Get(long id);

        List<AppointmentDto> GetByPatientId(int patientId);

        void Create(Appointment request);

        void Update(Appointment request);

        void Delete(long id);

        List<AppointmentDto> GetAppointmentWithPatient(long userId);

        List<AppointmentChairViewDto> AppointmentChairViewList(long userId);

        List<Assaign_Day> GetDays(long userId);
        List<Assign_Time> GetTimes(long userId);
        void UpdateTimes(long userId, List<Assign_Time> assignTimes);
        void DeleteTime(int id);

    }
}
