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
        public AppointmentService(IAppointmentRepository appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
           
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
            var appointments=await _appointmentRepository.GetAllAsync();
            return appointments;
        }

        public async Task<Appointment> GetByIdAsync(int id)
        {
            var appointment = await _appointmentRepository.GetByIdAsync(id);
            return appointment;
        }

        public Task<IEnumerable<Appointment>> GetByUserId(int userId)
        {
            var appointments =  _appointmentRepository.GetByUserId(userId);
            return appointments;
        }

        public void Update(Appointment request)
        {
            _appointmentRepository.Update(request);
        }
    }
}