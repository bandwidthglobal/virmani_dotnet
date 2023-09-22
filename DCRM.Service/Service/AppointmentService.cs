using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Microsoft.Extensions.Configuration;
using System.Numerics;

namespace DCRM.Service.Service
{
    public class AppointmentService : IAppointmentService
    {
        public readonly IAppointmentRepository _appointmentRepository;
        public readonly IPatientRepository _patientRepository;
        public AppointmentService(IAppointmentRepository appointmentRepository, IPatientRepository patientRepository)
        {
            _appointmentRepository = appointmentRepository;
            _patientRepository = patientRepository;
        }

        public async Task CreateAsync(Appointment request)
        {
            await _appointmentRepository.CreateAsync(request);
        }

        public async Task DeleteAsync(int id)
        {
            await _appointmentRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Appointment>> GetAllAsync()
        {
            var appointments = await _appointmentRepository.GetAllAsync();
            return appointments;
        }

        public List<Appointment> GetByPatientId(int userId, int patientId)
        {
            var appointments = _appointmentRepository.GetByPatientId(patientId).Where(x => x.User_Id == userId).
                OrderByDescending(x => x.Id).ToList();
            return appointments;
        }
        public async Task<Appointment> GetByIdAsync(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            return appointment;
        }

        public Task<IEnumerable<Appointment>> GetByUserId(int userId)
        {
            var appointments = _appointmentRepository.GetByUserId(userId);
            return appointments;
        }
        public List<AppointmentDto> GetAppointMentWithPatientByUserId(int userId)
        {
            var appointments = _appointmentRepository.GetByUser(userId);
            List<AppointmentDto> appointmentList = new List<AppointmentDto>();
            foreach (var appointment in appointments)
            {
                AppointmentDto appointmentDto = new AppointmentDto();
                appointmentDto.Id = appointment.Id;
                appointmentDto.Serial_Id = appointment.Serial_Id;
                appointmentDto.Date = appointment.Date;
                appointmentDto.Start_Time = appointment.Start_Time;
                appointmentDto.End_Time = appointment.End_Time;
                appointmentDto.Type = appointment.Type;
                appointmentDto.Patient_Id = appointment.Patient_Id;
                if (appointmentDto.Patient_Id > 0)
                {
                    appointmentDto.Patient = _patientRepository.Get(appointment.Patient_Id);
                }
                appointmentList.Add(appointmentDto);
            }
            return appointmentList;
        }
        public void Update(Appointment request)
        {
            _appointmentRepository.Update(request);
        }
    }
}