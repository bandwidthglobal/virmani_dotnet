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
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
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
            , IRepository<Doctor> repository, IRepository<Chair> chairRepository, IRepository<Assaign_Day> dayrepository, IRepository<Assign_Time> timeRepository)
        {
            _appointmentRepository = appointmentRepository;
            _patientRepository = patientRepository;
            _repository = repository;
            _chairRepository = chairRepository;
            _dayrepository = dayrepository;
            _timeRepository = timeRepository;
        }

        public IEnumerable<Appointment> GetAll(long userId, string role)
        {
            var appointments = _appointmentRepository.GetAll().Where(x => x.User_Id == userId);
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
            var appointments = _appointmentRepository.GetAll().Where(x => x.Patient_Id == patientId).OrderByDescending(x => x.Id).ToList();
            foreach (var item in appointments)
            {
                appointment = new AppointmentDto();
                appointment.Id = item.Id;
                if (item.Doctor_Id > 0)
                {
                    appointment.Doctor_Name = _repository.Get(item.Doctor_Id).Name;
                }

                appointment.Start_Time = item.Start_Time;
                appointment.Slot_Time = item.Slot_Time;
                appointment.Cause = item.Cause;
                if (!string.IsNullOrEmpty(item.Chair))
                {
                    if (_chairRepository.Get(Convert.ToInt64(item.Chair)) != null)
                    {
                        appointment.Chair = _chairRepository.Get(Convert.ToInt64(item.Chair)).Name;
                    }

                }
                appointmentList.Add(appointment);
            }
            return appointmentList;
        }
        public List<AppointmentDto> GetAppointmentWithPatient(long userId)
        {
            var appointments = _appointmentRepository.GetAll().Where(x => x.User_Id == userId).ToList();
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
                    var patient = _patientRepository.Get(appointment.Patient_Id);
                    appointmentDto.Patient = _patientRepository.Get(appointment.Patient_Id);
                    if (patient != null)
                    {
                        appointmentDto.Patient_Name = appointmentDto.Patient.Name;
                    }

                }
                var doctor = _repository.Get(appointment.Doctor_Id);
                if (doctor != null)
                {
                    appointmentDto.Doctor_Name = doctor.Name;
                }
                appointmentList.Add(appointmentDto);
            }
            return appointmentList;
        }

        public List<AppointmentChairViewDto> AppointmentChairViewList1(long userId)
        {

            var today = System.DateTime.Today.Day;
            var time = _timeRepository.GetAll().Where(x => x.Day_Id == 2 && userId == 2).FirstOrDefault();


            int i = -1;
            List<string> timeList = new List<string>();

            while (DateTime.Today.AddHours(9).AddMinutes(i * 15).Hour < 17.30)
            {
                timeList.Add(DateTime.Today.AddHours(9).AddMinutes(15 * (++i)).ToShortTimeString());
            };
            List<AppointmentChairViewDto> appointmentChairViews = new List<AppointmentChairViewDto>();
            timeList = timeList.Take(35).ToList();
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


        public AppointmentChairViewDto AppointmentChairViewold(long userId)
        {
            AppointmentChairViewDto appointmentChairView = new AppointmentChairViewDto();
            var today = System.DateTime.Today.DayOfWeek;
            int dayid = 0;
            switch (today)
            {
                case DayOfWeek.Sunday:
                    dayid = 1;
                    break;
                case DayOfWeek.Monday:
                    dayid = 2;
                    break;
                case DayOfWeek.Tuesday:
                    dayid = 3;
                    break;
                case DayOfWeek.Wednesday:
                    dayid = 4;
                    break;
                case DayOfWeek.Thursday:
                    dayid = 5;
                    break;
                case DayOfWeek.Friday:
                    dayid = 6;
                    break;
                case DayOfWeek.Saturday:
                    dayid = 7;
                    break;
                default:
                    break;
            }
            var assignTime = _timeRepository.GetAll().Where(x => x.User_Id == userId && x.Day_Id == dayid).FirstOrDefault();
            int i = -1;
            var timeValue = Convert.ToDateTime(assignTime.Start).Hour.ToString();
            var endtimeHourValue = Convert.ToDateTime(assignTime.End).Hour.ToString();
            var endtimeMinValue = Convert.ToDateTime(assignTime.End).Minute.ToString();
            var endTime = endtimeHourValue + "." + endtimeMinValue;
            List<string> timeList = new List<string>();


            while (DateTime.Today.AddHours(9).AddMinutes(i * 15).Hour < Convert.ToInt32(endtimeHourValue))
            {
                timeList.Add(DateTime.Today.AddHours(9).AddMinutes(15 * (++i)).ToShortTimeString());
            };
            appointmentChairView.ScheduleTimeList = timeList;
            appointmentChairView.ChairList = _chairRepository.GetAll().Where(x => x.User_Id == userId).ToList();
            var chairList = _chairRepository.GetAll().Where(x => x.User_Id == userId).ToList();
            foreach (var time in timeList)
            {
                foreach (var chair in chairList)
                {
                    var startTime = Convert.ToDateTime(time);
                    var timr = startTime.ToString().Split(" ")[1];
                    var appointment = _appointmentRepository.GetAll().Where(x => x.Chair == chair.Id.ToString() && x.Start_Time.ToString() == timr).FirstOrDefault();
                    AppointmentDto appointmentDto = new AppointmentDto();
                    if (appointment != null)
                    {
                        appointmentDto.Id = appointment.Id;
                        appointmentDto.Doctor_Name = _repository.Get(appointment.Doctor_Id).Name;
                        appointmentDto.Patient = _patientRepository.Get(appointment.Patient_Id);
                    }
                }
            }
            return appointmentChairView;
        }

        public AppointmentChairViewDto AppointmentChairView(long userId)
        {
            List<AppointmentScheduleTime> appointScheduleList = new List<AppointmentScheduleTime>();
            AppointmentChairViewDto appointmentChairView = new AppointmentChairViewDto();
            var today = System.DateTime.Today.DayOfWeek;
            int dayid = 0;
            switch (today)
            {
                case DayOfWeek.Sunday:
                    dayid = 1;
                    break;
                case DayOfWeek.Monday:
                    dayid = 2;
                    break;
                case DayOfWeek.Tuesday:
                    dayid = 3;
                    break;
                case DayOfWeek.Wednesday:
                    dayid = 4;
                    break;
                case DayOfWeek.Thursday:
                    dayid = 5;
                    break;
                case DayOfWeek.Friday:
                    dayid = 6;
                    break;
                case DayOfWeek.Saturday:
                    dayid = 7;
                    break;
                default:
                    break;
            }
            var assignTime = _timeRepository.GetAll().Where(x => x.User_Id == userId && x.Day_Id == dayid).FirstOrDefault();
            //get time list according given start and end time
            int i = -1;
            var timeValue = Convert.ToDateTime(assignTime.Start).Hour.ToString();
            var endtimeHourValue = Convert.ToDateTime(assignTime.End).Hour.ToString();
            var endtimeMinValue = Convert.ToDateTime(assignTime.End).Minute.ToString();
            var endTime = endtimeHourValue + "." + endtimeMinValue;
            List<string> timeList = new List<string>();


            while (DateTime.Today.AddHours(9).AddMinutes(i * 15).Hour < Convert.ToInt32(endtimeHourValue))
            {
                timeList.Add(DateTime.Today.AddHours(9).AddMinutes(15 * (++i)).ToShortTimeString());
            };
            appointmentChairView.ScheduleTimeList = timeList;

            List<DropdownDataDto> doctorList = new List<DropdownDataDto>();
            foreach (var doctor in _repository.GetAll().Where(x => x.User_Id == userId).ToList())
            {
                DropdownDataDto dropdownDataDto = new DropdownDataDto();
                dropdownDataDto.Id = doctor.Id;
                dropdownDataDto.Name = doctor.Name;
                doctorList.Add(dropdownDataDto);

            }
            appointmentChairView.DoctorList = doctorList;
            appointmentChairView.ChairList = _chairRepository.GetAll().Where(x => x.User_Id == userId).ToList();
            var chairList = _chairRepository.GetAll().Where(x => x.User_Id == userId).ToList();
            foreach (var time in timeList)
            {
                AppointmentScheduleTime appointmentScheduleTime = new AppointmentScheduleTime();
                appointmentScheduleTime.SlatTime = time;
                List<AppointmentChair> appointmentChairList = new List<AppointmentChair>();
                List<Chair> chairs = new List<Chair>();
                foreach (var chair in chairList)
                {
                    chairs.Add(chair);
                    AppointmentChair appointmentChair = new AppointmentChair();
                    appointmentChair.Name = chair.Name;
                    appointmentChair.Id = chair.Id;
                    appointmentChair.Appoinment_Limit = chair.Appoinment_Limit;
                    appointmentChair.Status = chair.Status;
                    appointmentChair.Address = chair.Address;
                    appointmentChair.Doctor_Id = chair.Doctor_Id;
                    var startTime = Convert.ToDateTime(time);
                    var timr = startTime.ToString().Split(" ")[1];
                    var appointment = _appointmentRepository.GetAll().Where(x => x.Chair == chair.Id.ToString() && x.Start_Time.ToString() == timr).FirstOrDefault();
                    AppointmentDto appointmentDto = new AppointmentDto();
                    if (appointment != null)
                    {
                        appointmentDto.Id = appointment.Id;
                        var doctor = _repository.Get(appointment.Doctor_Id);
                        if (doctor != null)
                        {
                            appointmentDto.Doctor_Name = doctor.Name;
                            appointmentDto.Doctor_Id = doctor.Id;
                        }
                        var patient = _patientRepository.Get(appointment.Patient_Id);
                        if (patient != null)
                        {
                            appointmentDto.Patient_Name = patient.Name;
                        }

                        appointmentChair.AppointmentDetails = appointmentDto;
                    }

                    appointmentChairList.Add(appointmentChair);

                }
                appointmentChairView.ChairList = chairs;
                appointmentScheduleTime.ChairList = appointmentChairList;
                appointScheduleList.Add(appointmentScheduleTime);
            }
            appointmentChairView.AppointmentScheduleTimes = appointScheduleList;
            return appointmentChairView;
        }

        public AppointmentChairViewDto AppointmentChairViewSearch(AppointmentChairViewSearchParameters parameters)
        {
            List<AppointmentScheduleTime> appointScheduleList = new List<AppointmentScheduleTime>();
            AppointmentChairViewDto appointmentChairView = new AppointmentChairViewDto();
            #region Slot Time List  
            var today = System.DateTime.Today.DayOfWeek;
            if (parameters.ScheduleDate != null)
            {
                today = Convert.ToDateTime(parameters.ScheduleDate).DayOfWeek;
            }
            int dayid = 0;
            switch (today)
            {
                case DayOfWeek.Sunday:
                    dayid = 1;
                    break;
                case DayOfWeek.Monday:
                    dayid = 2;
                    break;
                case DayOfWeek.Tuesday:
                    dayid = 3;
                    break;
                case DayOfWeek.Wednesday:
                    dayid = 4;
                    break;
                case DayOfWeek.Thursday:
                    dayid = 5;
                    break;
                case DayOfWeek.Friday:
                    dayid = 6;
                    break;
                case DayOfWeek.Saturday:
                    dayid = 7;
                    break;
                default:
                    break;
            }
            var assignTime = _timeRepository.GetAll().Where(x => x.User_Id == parameters.UserId && x.Day_Id == dayid).FirstOrDefault();
            int i = -1;
            var timeValue = Convert.ToDateTime(assignTime.Start).Hour.ToString();
            var endtimeHourValue = Convert.ToDateTime(assignTime.End).Hour.ToString();
            var endtimeMinValue = Convert.ToDateTime(assignTime.End).Minute.ToString();
            var endTime = endtimeHourValue + "." + endtimeMinValue;
            List<string> timeList = new List<string>();


            while (DateTime.Today.AddHours(9).AddMinutes(i * 15).Hour < Convert.ToInt32(endtimeHourValue))
            {
                timeList.Add(DateTime.Today.AddHours(9).AddMinutes(15 * (++i)).ToShortTimeString());
            };
            appointmentChairView.ScheduleTimeList = timeList;
            #endregion

            #region Doctor List
            List<DropdownDataDto> doctorList = new List<DropdownDataDto>();
            foreach (var doctor in _repository.GetAll().Where(x => x.User_Id == parameters.UserId).ToList())
            {
                DropdownDataDto dropdownDataDto = new DropdownDataDto();
                dropdownDataDto.Id = doctor.Id;
                dropdownDataDto.Name = doctor.Name;
                doctorList.Add(dropdownDataDto);

            }
            appointmentChairView.DoctorList = doctorList;
            #endregion

            #region Chair List
            var chairList = _chairRepository.GetAll().Where(x => x.User_Id == parameters.UserId && x.Status == 1).ToList();
            appointmentChairView.ChairList = chairList;
            if (!string.IsNullOrEmpty(parameters.ChairIds))
            {
                chairList = chairList.Where(x => x.Id.ToString() == parameters.ChairIds).ToList();
            }

            #endregion

            foreach (var time in timeList)
            {
                AppointmentScheduleTime appointmentScheduleTime = new AppointmentScheduleTime();
                appointmentScheduleTime.SlatTime = time;
                List<AppointmentChair> appointmentChairList = new List<AppointmentChair>();
                List<Chair> chairs = new List<Chair>();
                foreach (var chair in chairList)
                {
                    chairs.Add(chair);
                    AppointmentChair appointmentChair = new AppointmentChair();
                    appointmentChair.Name = chair.Name;
                    appointmentChair.Id = chair.Id;
                    appointmentChair.Appoinment_Limit = chair.Appoinment_Limit;
                    appointmentChair.Status = chair.Status;
                    appointmentChair.Address = chair.Address;
                    appointmentChair.Doctor_Id = chair.Doctor_Id;
                    var startTime = Convert.ToDateTime(time);
                    var timr = startTime.ToString().Split(" ")[1];
                    TimeSpan duration = TimeSpan.Parse(timr);
                    Appointment appointment = new Appointment();

                    var appointmentList = _appointmentRepository.GetAll().Where(x => x.Chair == chair.Id.ToString() && x.Start_Time == duration).ToList();

                    if (appointment != null)
                    {
                        if (!string.IsNullOrEmpty(parameters.ScheduleDate))
                        {
                            var date = Convert.ToDateTime(parameters.ScheduleDate);
                            appointment = appointmentList.Where(x => x.Date == date).FirstOrDefault();
                        }
                    }
                    AppointmentDto appointmentDto = new AppointmentDto();
                    if (appointment != null)
                    {
                        appointmentDto.Id = appointment.Id;
                        appointmentDto.Appointment_Status = appointment.Appointment_Status;
                        var doctor = _repository.Get(appointment.Doctor_Id);
                        if (doctor != null)
                        {
                            appointmentDto.Doctor_Name = doctor.Name;
                            appointmentDto.Doctor_Id = doctor.Id;
                        }
                        var patient = _patientRepository.Get(appointment.Patient_Id);
                        if (patient != null)
                        {
                            appointmentDto.Patient_Name = patient.Name;
                        }

                        appointmentChair.AppointmentDetails = appointmentDto;
                    }

                    appointmentChairList.Add(appointmentChair);

                }
                if (string.IsNullOrEmpty(parameters.DoctorIds))
                {
                    appointmentChairList = appointmentChairList.Where(x => x.Doctor_Id.ToString().Contains(parameters.DoctorIds)).ToList();
                }
                if (string.IsNullOrEmpty(parameters.DoctorIds))
                {
                    appointmentChairList = appointmentChairList.Where(x => x.Doctor_Id.ToString().Contains(parameters.DoctorIds)).ToList();
                }
                appointmentChairView.ChairList = chairs;
                appointmentScheduleTime.ChairList = appointmentChairList;
                appointScheduleList.Add(appointmentScheduleTime);
            }
            appointmentChairView.AppointmentScheduleTimes = appointScheduleList;
            return appointmentChairView;
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
            assaignTimes = _timeRepository.GetAll().Where(x => x.User_Id == userId).ToList();
            return assaignTimes;
        }

        public void Create(AppointmentRequest request)
        {
            long patientId = 0;
            if (request.Patient_Id == 0)
            {
                PatientRequest patientse = new PatientRequest();
                patientse.Name = request.Patient_Name;
                patientse.Email = request.Email;
                patientse.Age = Convert.ToSByte(request.Age);
                patientse.Mobile = request.Phone;
                patientse.Sex = "male";// request.Gender;
                PatientsContact patientsContact = new PatientsContact();
                List<PatientsContact> patientsContacts = new List<PatientsContact>();
                patientsContact.Email = request.Email;
                patientsContact.Phone = request.Phone;
                patientsContacts.Add(patientsContact);
                patientse.PatientContacts = patientsContacts;
                request.Patient_Id = Convert.ToInt32(_patientRepository.Create(patientse));
            }
            Appointment appointment = new Appointment();
            appointment.Id = request.Id;
            appointment.Chamber_Id = request.Chamber_Id;
            appointment.User_Id = request.User_Id;
            appointment.Patient_Id = request.Patient_Id;
            appointment.Doctor_Id = request.Doctor_Id;
            appointment.Doctor_Name = request.Doctor_Name;
            appointment.Chair = request.Chair;
            appointment.Number_Of_Slot = request.Number_Of_Slot;
            appointment.Slot_Time = request.Slot_Time;
            appointment.Cause = request.Cause;
            appointment.Extra_Notes = request.Extra_Notes;
            appointment.Prescription_Id = request.Prescription_Id;
            appointment.Date = request.Date;
            appointment.Start_Time = request.Start_Time;
            appointment.End_Time = request.End_Time;
            appointment.Meeting_Notes = request.Meeting_Notes;
            appointment.Files = request.Files;
            appointment.Type = request.Type;
            appointment.Serial_Id = request.Serial_Id;
            appointment.Status = request.Status;
            appointment.Appointment_Status = request.Appointment_Status;
            appointment.Is_Start = request.Is_Start;
            appointment.Is_Delete = request.Is_Delete;
            appointment.Created_At = DateTime.Now;
            _appointmentRepository.Create(appointment);
        }
        public void Update(Appointment request)
        {
            _appointmentRepository.Update(request);
        }
        public void Delete(long id)
        {
            _appointmentRepository.Delete(id);
        }

        public void CreateDays(Assaign_Day assignDay)
        {
            _dayrepository.Insert(assignDay);
        }
        public void CreateTime(Assign_Time assignTime)
        {
            _timeRepository.Insert(assignTime);
        }
        public void UpdateTimes(long userId, List<Assign_Time> assignTimes)
        {
            foreach (var item in assignTimes)
            {
                if (item.Id == 0)
                {
                    Assign_Time time = new Assign_Time();
                    time.User_Id = item.User_Id;
                    time.Day_Id = item.Day_Id;
                    time.Start = item.Start;
                    time.Time = item.Time;
                    time.End = item.End;
                    _timeRepository.Create(time);
                }
                else
                {
                    var time = _timeRepository.Get(item.Id);
                    time.User_Id = item.User_Id;
                    time.Day_Id = item.Day_Id;
                    time.Start = item.Start;
                    time.Time = item.Time;
                    time.End = item.End;
                    _timeRepository.Update(time);
                }

            }
        }
        public void DeleteTime(int id)
        {
            var assaignTimes = _timeRepository.Get(id);
            _timeRepository.Delete(assaignTimes);
        }

        public List<AppointmentDto> GetWaitingRoom(long userId)
        {
            List<AppointmentDto> appointments = new List<AppointmentDto>();
            var todayDate = System.DateTime.Now.Date;
            var apointmentList = _appointmentRepository.GetAll().Where(x => x.Appointment_Status == 4 || x.Appointment_Status == 5 && x.User_Id == userId).ToList();
            foreach (var apointment in apointmentList)
            {
                AppointmentDto appointmentDto = new AppointmentDto();
                appointmentDto.Id = apointment.Id;
                var doctor = _repository.Get(apointment.Doctor_Id);
                if (doctor != null)
                {
                    appointmentDto.Doctor_Name = doctor.Name;
                    appointmentDto.Doctor_Id = doctor.Id;
                }
                var patient = _patientRepository.Get(apointment.Patient_Id);
                if (patient != null)
                {
                    appointmentDto.Patient_Name = patient.Name;
                }
                appointmentDto.Date = apointment.Date;
                appointmentDto.Appointment_Status = apointment.Appointment_Status;
                appointmentDto.Slot_Time = apointment.Slot_Time;
                appointmentDto.Start_Time = apointment.Start_Time;
                appointmentDto.End_Time = apointment.End_Time;
                appointmentDto.Cause = apointment.Cause;
                appointmentDto.Chair = apointment.Chair;
                appointmentDto.Serial_Id = apointment.Serial_Id;
                appointments.Add(appointmentDto);
            }
            //appointments = appointments.Where(x => x.Date == todayDate && x.Start_Time> DateTime.Now.TimeOfDay).ToList();
            //TimeSpan TodayTime = DateTime.Now.TimeOfDay.CompareTo();
            return appointments;
        }

        public void ChangeAppointmentStatus(long id, int status)
        {
            _appointmentRepository.ChangeAppointmentStatus(id, status);
        }

        public void SetSchedule(ScheduleTimeRequest scheduleTime)
        {

            for (int i = 1; i < 8; i++)
            {
              var time=  _timeRepository.GetAll().Where(x=>x.Day_Id== i && x.User_Id== scheduleTime.User_Id).FirstOrDefault();
                if (time!=null)
                {
                    scheduleTime.User_Id= time.User_Id;
                    switch (i)
                    {
                        case 1:
                            time.Start = scheduleTime.start1;
                            time.End = scheduleTime.end1;
                            time.Time = scheduleTime.start1 + "-" + scheduleTime.end1;
                            _timeRepository.Update(time);
                            break;
                        case 2:
                            time.Start = scheduleTime.start2;
                            time.End = scheduleTime.end2;
                            time.Time = scheduleTime.start2 + "-" + scheduleTime.end2;
                            _timeRepository.Update(time);
                            break;
                        case 3:
                            time.Start = scheduleTime.start3;
                            time.End = scheduleTime.end3;
                            time.Time = scheduleTime.start3 + "-" + scheduleTime.end3;
                            _timeRepository.Update(time);
                            break;
                        case 4:
                            time.Start = scheduleTime.start4;
                            time.End = scheduleTime.end4;
                            time.Time = scheduleTime.start4 + "-" + scheduleTime.end4;
                            _timeRepository.Update(time);
                            break;
                        case 5:
                            time.Start = scheduleTime.start5;
                            time.End = scheduleTime.end5;
                            time.Time = scheduleTime.start5 + "-" + scheduleTime.end5;
                            _timeRepository.Update(time);
                            break;
                        case 6:
                            time.Start = scheduleTime.start6;
                            time.End = scheduleTime.end6;
                            time.Time = scheduleTime.start6 + "-" + scheduleTime.end6;
                            _timeRepository.Update(time);
                            break;
                        case 7:
                            time.Start = scheduleTime.start7;
                            time.End = scheduleTime.end7;
                            time.Time = scheduleTime.start7 + "-" + scheduleTime.end7;
                            _timeRepository.Update(time);
                            break;
                        default:
                            break;
                    }
                }
                else
                {
                    Assign_Time assign_Time=new Assign_Time();
                    switch (i)
                    {
                        case 1:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day1);
                            assign_Time.Start = scheduleTime.start1;
                            assign_Time.End = scheduleTime.end1;
                            assign_Time.Time = scheduleTime.start1 + "-" + scheduleTime.end1;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 2:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day2);
                            assign_Time.Start = scheduleTime.start2;
                            assign_Time.End = scheduleTime.end2;
                            assign_Time.Time = scheduleTime.start2 + "-" + scheduleTime.end2;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 3:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day3);
                            assign_Time.Start = scheduleTime.start3;
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day3);
                            assign_Time.End = scheduleTime.end3;
                            assign_Time.Time = scheduleTime.start3 + "-" + scheduleTime.end3;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 4:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day4);
                            assign_Time.Start = scheduleTime.start4;
                            assign_Time.End = scheduleTime.end4;
                            assign_Time.Time = scheduleTime.start4 + "-" + scheduleTime.end4;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 5:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day5);
                            assign_Time.Start = scheduleTime.start5;
                            assign_Time.End = scheduleTime.end5;
                            assign_Time.Time = scheduleTime.start5 + "-" + scheduleTime.end5;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 6:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day6);
                            assign_Time.Start = scheduleTime.start6;
                            assign_Time.End = scheduleTime.end6;
                            assign_Time.Time = scheduleTime.start6 + "-" + scheduleTime.end6;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 7:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day7);
                            assign_Time.Start = scheduleTime.start7;
                            assign_Time.End = scheduleTime.end7;
                            assign_Time.Time = scheduleTime.start7 + "-" + scheduleTime.end7;
                            _timeRepository.Insert(assign_Time);
                            break;
                        default:
                            break;
                    }
                }
              
            }
           
            //_appointmentRepository.ChangeAppointmentStatus(id, status);
        }
    }
}