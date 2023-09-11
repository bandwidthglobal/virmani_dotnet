using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Data.SqlTypes;

namespace DCRM.Repository.Repository
{
    public class AppointmentRepository : IAppointmentRepository
    {

        public readonly DCRMDBContext _contex;
        public AppointmentRepository(DCRMDBContext contex)
        {
            _contex = contex;

        }
        public async Task CreateAsync(Appointment appointment)
        {
            await _contex.Appointments.AddAsync(appointment);
            _contex.SaveChanges();
        }

        public async Task DeleteAsync(int id)
        {
            var appointment = await _contex.Appointments.FirstOrDefaultAsync(x => x.Id == id);
            if (appointment != null)
            {
                appointment.Is_Delete = 1;
                _contex.Appointments.Update(appointment);
                await _contex.SaveChangesAsync();
            }
        }

        public List<Appointment> GetByPatientId(int patientId)
        {
            var appointments = _contex.Appointments.Where(x => x.Is_Delete == 0 && x.Patient_Id== patientId).
                OrderByDescending(x=>x.Id).ToList();
            return appointments;
        }

        public async Task<IEnumerable<Appointment>> GetAllAsync()
        {
            var appointments = _contex.Appointments.Where(x => x.Is_Delete == 0);
            return appointments;
        }

        public async Task<Appointment> GetByIdAsync(int id)
        {
            var appointment = await _contex.Appointments.FirstOrDefaultAsync(x => x.Id == id && x.Is_Delete == 0);
            return appointment;
        }

        public async Task<IEnumerable<Appointment>> GetByUserId(int userId)
        {
            var appointment = _contex.Appointments.Where(x => x.User_Id == userId && x.Is_Delete == 0);
            return appointment;
        }

        public void Update(Appointment request)
        {
            _contex.Update(request);
            _contex.SaveChanges();
            
        }
    }
}