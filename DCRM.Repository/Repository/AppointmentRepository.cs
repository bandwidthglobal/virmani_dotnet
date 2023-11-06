using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using K4os.Hash.xxHash;
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
        public IEnumerable<Appointment> GetAll()
        {
            var appointments = _contex.Appointments.Where(x => x.Is_Delete == 0);
            return appointments;
        }

        public Appointment Get(long id)
        {
            Appointment appointment = _contex.Appointments.FirstOrDefault(x => x.Id == id && x.Is_Delete == 0);
            return appointment;
        }
        public void Create(Appointment appointment)
        {
            var appointmentDetails = _contex.Appointments.Where(x => x.Date == appointment.Date);
            int serialId = 0;
            if (appointmentDetails.Any()) {
                serialId = appointmentDetails.Max(x => x.Serial_Id);
            }
            appointment.Serial_Id = serialId + 1;
            
            _contex.Appointments.Add(appointment);
            _contex.SaveChanges();
        }



        public void Update(Appointment request)
        {
            _contex.Update(request);
            _contex.SaveChanges();

        }

        public void Delete(long id)
        {
            var appointment = _contex.Appointments.FirstOrDefault(x => x.Id == id);
            if (appointment != null)
            {
                appointment.Is_Delete = 1;
                _contex.Appointments.Update(appointment);
                _contex.SaveChanges();
            }
        }

        public void ChangeAppointmentStatus(long id, int status)
        {
            var appointment = _contex.Appointments.FirstOrDefault(x => x.Id == id);
            if (appointment != null)
            {
                appointment.Appointment_Status = status;
                _contex.Appointments.Update(appointment);
                _contex.SaveChanges();
            }
        }
    }
}