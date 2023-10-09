using DCRM;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.Request;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using Demo_Api.Models;
using Microsoft.Extensions.Configuration;
using System.Numerics;

namespace DCRM.Service.Service
{
    public class AppointmentService : IAppointmentService
    {
        public readonly IAppointmentRepository _appointmentRepository;
        public readonly IPatientRepository _patientRepository;
        public readonly IRepository<Doctor> _repository;
        public readonly IRepository<Chair> _chairRepository;
        public readonly IRepository<Assaign_Day> _dayrepository;
        public readonly IRepository<Assign_Time> _timeRepository;
        public AppointmentService(IAppointmentRepository appointmentRepository, IPatientRepository patientRepository
            , IRepository<Doctor> repository,IRepository<Chair> chairRepository, IRepository<Assaign_Day> dayrepository, IRepository<Assign_Time> timeRepository)
        {
            _appointmentRepository = appointmentRepository;
            _patientRepository = patientRepository;
            _repository= repository;
            _chairRepository = chairRepository;
            _dayrepository= dayrepository;
            _timeRepository= timeRepository;
        }

        public IEnumerable<Appointment> GetAll(long userId,string role)
        {
            var appointments =  _appointmentRepository.GetAll().Where(x=>x.User_Id== userId);
            return appointments;
        }

        public Appointment Get(long id)
        {
            var appointment = _appointmentRepository.Get(id);
            return appointment;
        }
        public List<AppointmentDto> GetByPatientId(int patientId)
        {
            List<AppointmentDto> appointmentList = new List<AppointmentDto>();
            AppointmentDto appointment = null;
            var appointments = _appointmentRepository.GetAll().Where(x=>x.Patient_Id== patientId).OrderByDescending(x => x.Id).ToList();
            foreach (var item in appointments)
            {
                appointment = new AppointmentDto();
                appointment.Id = item.Id;
                if (item.Doctor_Id>0)
                {
                    appointment.Doctor_Name = _repository.Get(item.Doctor_Id).Name;
                }
                
                appointment.Start_Time = item.Start_Time;
                appointment.Slot_Time = item.Slot_Time;
                appointment.Cause = item.Cause;
                if (!string.IsNullOrEmpty(item.Chair))
                {
                    appointment.Chair = _chairRepository.Get(Convert.ToInt64(item.Chair)).Name;
                }
                appointmentList.Add(appointment);
            }
            return appointmentList;
        }
        public List<AppointmentDto> GetAppointmentWithPatient(long userId)
        {
            var appointments = _appointmentRepository.GetAll().Where(x=>x.User_Id==userId);
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

       public List<AppointmentChairViewDto> AppointmentChairViewList(long userId)
        {
            List<AppointmentChairViewDto> appointmentChairViews = new List<AppointmentChairViewDto>();

            var appointments = _appointmentRepository.GetAll().Where(x => x.User_Id == userId).OrderByDescending(x => x.Id).ToList();
            foreach (var item in appointments)
            {
                AppointmentChairViewDto appointment = new AppointmentChairViewDto();
                appointment.Id = item.Id;
                appointment.DoctorId = item.Doctor_Id;
                if (item.Doctor_Id > 0)
                {
                    appointment.DoctorName = _repository.Get(item.Doctor_Id).Name;
                }
                appointment.SlotTime = item.Slot_Time;
                if (!string.IsNullOrEmpty(item.Chair))
                {
                    appointment.Chair = _chairRepository.Get(Convert.ToInt64(item.Chair));
                }
                appointmentChairViews.Add(appointment);
            }
            return appointmentChairViews;
        }

        public List<Assaign_Day> GetDays(long userId)
        {
            List<Assaign_Day> assaignDays = new List<Assaign_Day>();
            assaignDays = _dayrepository.GetAll().Where(x => x.User_Id == userId).ToList();
            return assaignDays;
        }
        public List<Assign_Time> GetTimes(long userId)
        {
            List<Assign_Time> assaignTimes = new List<Assign_Time>();
            assaignTimes= _timeRepository.GetAll().Where(x => x.User_Id == userId).ToList();
            return assaignTimes;
        }
        public void CreateDays(Assaign_Day assignDay)
        {
           _dayrepository.Insert(assignDay);
        }
        public void CreateTime(Assign_Time assignTime)
        {
           _timeRepository.Insert(assignTime);
        }
        public void UpdateTime(Assign_Time assignTime)
        {
            _timeRepository.Update(assignTime);
        }
        public void Create(Appointment request)
        {
            _appointmentRepository.Create(request);
        }
        public void Update(Appointment request)
        {
            _appointmentRepository.Update(request);
        }
        public void Delete(long id)
        {
            _appointmentRepository.Delete(id);
        }
    }
}