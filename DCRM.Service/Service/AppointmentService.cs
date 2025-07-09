using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;

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
        public readonly IRepository<PatientsContact> _patientContactRepository;


        public AppointmentService(IAppointmentRepository appointmentRepository, IPatientRepository patientRepository
            , IRepository<Doctor> repository, IRepository<Chair> chairRepository, IRepository<Assaign_Day> dayrepository, IRepository<Assign_Time> timeRepository, IRepository<PatientsContact> patientContactRepository)
        {
            _appointmentRepository = appointmentRepository;
            _patientRepository = patientRepository;
            _repository = repository;
            _chairRepository = chairRepository;
            _dayrepository = dayrepository;
            _timeRepository = timeRepository;
            _patientContactRepository = patientContactRepository;
            
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
        public AppointmentDto GetAppointmentDetails(long id)
        {
            AppointmentDto appointmentDto = new();
            var tdAppointMent = from a in _appointmentRepository.GetAll().ToList()
                                join p in _patientRepository.GetAll().ToList() on a.Patient_Id equals p.Id
                                join d in _repository.GetAll().ToList() on a.Doctor_Id equals d.Id
                                select new
                                {
                                    a.Id,
                                    a.Appointment_Status,
                                    Doctor_Name = d.Name,
                                    Doctor_Id = d.Id,
                                    Patient_Name = p.Name,
                                    Patient_Id = p.Id,
                                    a.Start_Time,
                                    a.End_Time,
                                    a.Chair,
                                    a.Number_Of_Slot,
                                    a.Serial_Id,
                                    a.Type,
                                    a.Chamber_Id,
                                    a.Cause,
                                    a.Date,
                                    a.Slot_Time,
                                    p.Email,
                                    Phone = p.Mobile,
                                    p.Mr_Number,
                                    a.Meeting_Notes,
                                    p.Age,
                                    p.Weight

                                };
            if (tdAppointMent!=null)
            {
                foreach (var appointment in tdAppointMent)
                {
                    appointmentDto.Id = (int)appointment.Id;
                    appointmentDto.Serial_Id = appointment.Serial_Id;
                    appointmentDto.Doctor_Id = appointment.Doctor_Id;
                    appointmentDto.Doctor_Name = appointment.Doctor_Name;
                    appointmentDto.Date = appointment.Date;
                    appointmentDto.Start_Time = appointment.Start_Time;
                    appointmentDto.End_Time = appointment.End_Time;
                    appointmentDto.Type = appointment.Type;
                    appointmentDto.Patient_Id = appointment.Patient_Id;
                    appointmentDto.Patient_Name = appointment.Patient_Name;
                    appointmentDto.Slot_Time = appointment.Slot_Time;
                    appointmentDto.Number_Of_Slot = appointment.Number_Of_Slot;
                    appointmentDto.Cause = appointment.Cause;
                    appointmentDto.Meeting_Notes = appointment.Meeting_Notes;
                    Patientse patientse = new()
                    {
                        Name = appointment.Patient_Name,
                        Email = appointment.Email,
                        Mobile = appointment.Phone,
                        Mr_Number = appointment.Mr_Number,
                        Age = appointment.Age,
                        Weight = appointment.Weight
                    };
                    appointmentDto.Patient = patientse;
                }
            }
          
            return appointmentDto;
        }
        public List<AppointmentDto> GetByPatientId(int patientId)
        {
            List<AppointmentDto> appointmentList = new List<AppointmentDto>();

            var appointments = from s in _appointmentRepository.GetAll().ToList()
                               join d in _repository.GetAll().ToList() on s.Doctor_Id equals d.Id
                               join c in _chairRepository.GetAll().ToList() on s.Chair equals c.Id.ToString()
                               where s.Patient_Id == patientId
                               select new
                               {
                                   s.Id,
                                   s.Appointment_Status,
                                   Doctor_Name = d.Name,
                                   Doctor_Id = d.Id,
                                   s.Start_Time,
                                   s.End_Time,
                                   s.Number_Of_Slot,
                                   s.Serial_Id,
                                   s.Type,
                                   s.Chamber_Id,
                                   Chair = c.Name,
                                   s.Slot_Time,
                                   s.Cause
                               };

            AppointmentDto? appointment = null;
            appointments = appointments.OrderByDescending(x => x.Id);
            foreach (var item in appointments)
            {
                appointment = new AppointmentDto();
                appointment.Id = (int)item.Id;
                appointment.Start_Time = item.Start_Time;
                appointment.Slot_Time = item.Slot_Time;
                appointment.Cause = item.Cause;
                appointment.Chair = item.Chair;
                appointment.Doctor_Name = item.Doctor_Name;
                appointmentList.Add(appointment);
            }
            return appointmentList;
        }
        public List<AppointmentDto> GetAppointmentWithPatient(long userId)
        {

            var tdAppointMent = from a in _appointmentRepository.GetAll().ToList()
                                join p in _patientRepository.GetAll().ToList() on a.Patient_Id equals p.Id
                                join d in _repository.GetAll().ToList() on a.Doctor_Id equals d.Id
                                where a.User_Id == userId
                                select new
                                {
                                    a.Id,
                                    a.Appointment_Status,
                                    Doctor_Name = d.Name,
                                    Doctor_Id = d.Id,
                                    Patient_Name = p.Name,
                                    Patient_Id = p.Id,
                                    a.Start_Time,
                                    a.End_Time,
                                    a.Chair,
                                    a.Number_Of_Slot,
                                    a.Serial_Id,
                                    a.Type,
                                    a.Chamber_Id,
                                    a.Cause,
                                    a.Date,
                                    a.Slot_Time,
                                    p.Email,
                                    Phone = p.Mobile,
                                    p.Mr_Number,
                                    a.Status

                                };

            List<AppointmentDto> appointmentList = new List<AppointmentDto>();
            foreach (var appointment in tdAppointMent)
            {
                AppointmentDto appointmentDto = new AppointmentDto();
                appointmentDto.Id = (int)appointment.Id;
                appointmentDto.Serial_Id = appointment.Serial_Id;
                appointmentDto.Doctor_Id = appointment.Doctor_Id;
                appointmentDto.Doctor_Name = appointment.Doctor_Name;
                appointmentDto.Date = appointment.Date;
                appointmentDto.Start_Time = appointment.Start_Time;
                appointmentDto.End_Time = appointment.End_Time;
                appointmentDto.Type = appointment.Type;
                appointmentDto.Patient_Id = appointment.Patient_Id;
                appointmentDto.Patient_Name = appointment.Patient_Name;
                appointmentDto.Appointment_Status = appointment.Appointment_Status;
                appointmentDto.Status = appointment.Status;
                Patientse patientse = new()
                {
                    Name = appointment.Patient_Name,
                    Email = appointment.Email,
                    Mobile = appointment.Phone,
                    Mr_Number = appointment.Mr_Number
                };

                appointmentDto.Patient = patientse;
                appointmentList.Add(appointmentDto);
            }
            return appointmentList;
        }

        public AppointmentChairViewDto AppointmentChairViewSearch(AppointmentChairViewSearchParameters parameters)
        {
            List<AppointmentScheduleTime> appointScheduleList = new();
            AppointmentChairViewDto appointmentChairView = new();
            List<DropdownDataDto> doctorList = new();
            // Get Appontment
            #region Get Appointment
            var td = from s in _appointmentRepository.GetAll().ToList()
                     join r in _patientRepository.GetAll().ToList() on s.Patient_Id equals r.Id
                     join d in _repository.GetAll().ToList() on s.Doctor_Id equals d.Id
                     join pc in _patientContactRepository.GetAll().ToList() on r.Id equals pc.Patient_Id
                     where s.User_Id == parameters.UserId
                     && s.Date.Ticks.Equals(Convert.ToDateTime(parameters.ScheduleDate).Ticks)
                     && s.Status == 0
                     select new
                     {
                         s.Id,
                         s.Appointment_Status,
                         Doctor_Name = d.Name,
                         Doctor_Id = d.Id,
                         Patient_Name = r.Name,
                         Patient_Id = r.Id,
                         Address = r.Present_Address,
                         s.Start_Time,
                         s.End_Time,
                         s.Chair,
                         s.Number_Of_Slot,
                         s.Serial_Id,
                         s.Type,
                         s.Chamber_Id,
                         s.Cause,
                         pc.Phone1
                     };
            #endregion
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
            var timeValue = assignTime != null && !string.IsNullOrEmpty(assignTime.Start) ? Convert.ToDateTime(assignTime.Start).Hour.ToString() : "0";
            var endtimeHourValue = assignTime != null! && !string.IsNullOrEmpty(assignTime.End) ?  Convert.ToDateTime(assignTime.End).Hour.ToString() : "0";
            var endtimeMinValue = assignTime != null && !string.IsNullOrEmpty(assignTime.End) ? Convert.ToDateTime(assignTime.End).Minute.ToString() : "0";
            var endTime = endtimeHourValue + "." + endtimeMinValue;
            List<string> timeList = new();
            while (DateTime.Today.AddHours(9).AddMinutes(i * 15).Hour < Convert.ToInt32(17))
            {
                timeList.Add(DateTime.Today.AddHours(9).AddMinutes(15 * (++i)).ToShortTimeString());
            };
            appointmentChairView.ScheduleTimeList = timeList;
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
                AppointmentScheduleTime appointmentScheduleTime = new()
                {
                    SlatTime = time
                };
                List<AppointmentChair> appointmentChairList = new();
                List<Chair> chairs = new();
                foreach (var chair in chairList)
                {
                    chairs.Add(chair);
                    Appointment appointment = new();
                    AppointmentDto appointmentDto = new();
                    AppointmentChair appointmentChair = new()
                    {
                        Name = chair.Name,
                        Id = chair.Id,
                        Appoinment_Limit = chair.Appoinment_Limit,
                        Status = chair.Status,
                        Address = chair.Address,
                        Doctor_Id = chair.Doctor_Id
                    };
                    var newTime = convertFrom24To12Format(time);
                    newTime = newTime + ":00";
                    TimeSpan duration = TimeSpan.Parse(newTime);
                    var td1a = td.Where(x => x.Chair == chair.Id.ToString());
                    td1a = td1a.Where(x => x.Start_Time.TotalSeconds == duration.TotalSeconds);
                    var td1 = td.Where(x => x.Chair == chair.Id.ToString() && x.Start_Time.Ticks.Equals(duration.Ticks));//.FirstOrDefault().Start_Time.Ticks.ToString();
                    var nn = duration.Ticks.ToString();
                    if (td.Count() > 0)
                    {
                        if (!string.IsNullOrEmpty(parameters.ChairIds))
                        {
                            td1 = td1.Where(x => x.Chair.Contains(parameters.ChairIds));
                        }
                        if (!string.IsNullOrEmpty(parameters.DoctorIds))
                        {
                            td1 = td1.Where(x => x.Chair.Contains(parameters.DoctorIds));
                        }
                        var appointmentDetails = td1.FirstOrDefault();

                        if (appointmentDetails != null)
                        {
                            appointmentDto.Id = (int)appointmentDetails.Id;
                            appointmentDto.Number_Of_Slot = appointmentDetails.Number_Of_Slot;
                            appointmentDto.Appointment_Status = appointmentDetails.Appointment_Status;
                            appointmentDto.Doctor_Name = appointmentDetails.Doctor_Name;
                            appointmentDto.Doctor_Id = appointmentDetails.Doctor_Id;
                            appointmentDto.Patient_Name = appointmentDetails.Patient_Name;
                            appointmentDto.Patient_Address = appointmentDetails.Address;
                            appointmentDto.Cause = appointmentDetails.Cause;
                            appointmentDto.Mobile = appointmentDetails.Phone1;
                            appointmentChair.AppointmentDetails = appointmentDto;
                        }
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

        public string convertFrom24To12Format(string time)
        {
            DateTime d = DateTime.Parse(time);
            var aa = d.ToString("HH:mm");
            return aa;

        }

        public List<Assaign_Day> GetDays(long userId)
        {
            List<Assaign_Day> assaignDays = new();
            assaignDays = _dayrepository.GetAll().Where(x => x.User_Id == userId).ToList();
            return assaignDays;
        }
        public List<Assign_Time> GetTimes(long userId)
        {
            List<Assign_Time> assaignTimes = new();
            assaignTimes = _timeRepository.GetAll().Where(x => x.User_Id == userId).ToList();
            return assaignTimes;
        }

        public long Create(AppointmentRequest request)
        {

            if (request.Patient_Id == 0)
            {
                PatientRequest patientse = new()
                {
                    Name = request.Patient_Name,
                    Email = request.Email,
                    Age = request.Age,
                    Mobile = request.Phone,
                    Weight = request.Weight == null ? 0 : Convert.ToInt32(request.Weight),
                    User_Id = request.User_Id,
                    Sex = request.Gender
                };
                PatientsContact patientsContact = new();
                List<PatientsContact> patientsContacts = new();
                patientsContact.Email = request.Email;
                patientsContact.Phone1 = Convert.ToInt64(request.Phone);
                patientsContacts.Add(patientsContact);
                patientse.PatientContacts = patientsContacts;
                request.Patient_Id = Convert.ToInt32(_patientRepository.Create(patientse));
            }
            Appointment appointment = new()
            {
                Id = request.Id,
                Chamber_Id = request.Chamber_Id,
                User_Id = request.User_Id,
                Patient_Id = request.Patient_Id,
                Doctor_Id = request.Doctor_Id,
                Doctor_Name = request.Doctor_Name,
                Chair = request.Chair,
                Number_Of_Slot = request.Number_Of_Slot,
                Slot_Time = request.Slot_Time,
                Cause = request.Cause,
                Extra_Notes = request.Extra_Notes,
                Prescription_Id = request.Prescription_Id,
                Date = request.Date,
                Start_Time = request.Start_Time
            };
            if (!request.End_Time.Contains("60"))
            {
                appointment.End_Time = TimeSpan.Parse(request.End_Time);
            }
            else
            {
                var time = Convert.ToInt16(request.End_Time.Split(':')[0]);
                appointment.End_Time = TimeSpan.Parse((time + 1).ToString() + ":00:00");
            }

            appointment.Meeting_Notes = request.Meeting_Notes;
            appointment.Files = request.Files;
            appointment.Type = request.Type;
            appointment.Serial_Id = request.Serial_Id;
            appointment.Status = request.Status;
            appointment.Appointment_Status = request.Appointment_Status;
            appointment.Is_Start = request.Is_Start;
            appointment.Is_Delete = request.Is_Delete;
            appointment.Created_At = DateTime.Now;
            long id = _appointmentRepository.Create(appointment);
            return id;

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
                    Assign_Time time = new()
                    {
                        User_Id = item.User_Id,
                        Day_Id = item.Day_Id,
                        Start = item.Start,
                        Time = item.Time,
                        End = item.End
                    };
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
            List<AppointmentDto> appointments = new();
            var tdAppointMent = from s in _appointmentRepository.GetAll().ToList()
                                join r in _patientRepository.GetAll().ToList() on s.Patient_Id equals r.Id
                                join d in _repository.GetAll().ToList() on s.Doctor_Id equals d.Id
                                where s.User_Id == userId && (s.Appointment_Status == 4 || s.Appointment_Status == 5)
                                select new
                                {
                                    s.Id,
                                    s.Appointment_Status,
                                    Doctor_Name = d.Name,
                                    Doctor_Id = d.Id,
                                    Patient_Name = r.Name,
                                    Patient_Id = r.Id,
                                    s.Start_Time,
                                    s.End_Time,
                                    s.Chair,
                                    s.Number_Of_Slot,
                                    s.Serial_Id,
                                    s.Type,
                                    s.Chamber_Id,
                                    s.Cause,
                                    s.Date,
                                    s.Slot_Time,
                                };
            foreach (var apointment in tdAppointMent)
            {
                AppointmentDto appointmentDto = new()
                {
                    Id = (int)apointment.Id,
                    Doctor_Name = apointment.Doctor_Name,
                    Doctor_Id = apointment.Doctor_Id,
                    Patient_Name = apointment.Patient_Name,
                    Patient_Id = apointment.Patient_Id,
                    Date = apointment.Date,
                    Appointment_Status = apointment.Appointment_Status,
                    Slot_Time = apointment.Slot_Time,
                    Start_Time = apointment.Start_Time,
                    End_Time = apointment.End_Time,
                    Cause = apointment.Cause,
                    Chair = apointment.Chair,
                    Serial_Id = apointment.Serial_Id
                };
                appointments.Add(appointmentDto);
            }
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
                var time = _timeRepository.GetAll().Where(x => x.Day_Id == i && x.User_Id == scheduleTime.User_Id).FirstOrDefault();
                if (time != null)
                {
                    scheduleTime.User_Id = time.User_Id;
                    switch (i)
                    {
                        case 1:
                            time.Start = scheduleTime.Start1;
                            time.End = scheduleTime.End1;
                            time.Day_Id = i;
                            time.Time = scheduleTime.Start1 + "-" + scheduleTime.End1;
                            _timeRepository.Update(time);
                            break;
                        case 2:
                            time.Start = scheduleTime.Start2;
                            time.End = scheduleTime.End2;
                            time.Day_Id = i;
                            time.Time = scheduleTime.Start2 + "-" + scheduleTime.End2;
                            _timeRepository.Update(time);
                            break;
                        case 3:
                            time.Start = scheduleTime.Start3;
                            time.End = scheduleTime.End3;
                            time.Day_Id = i;
                            time.Time = scheduleTime.Start3 + "-" + scheduleTime.End3;
                            _timeRepository.Update(time);
                            break;
                        case 4:
                            time.Start = scheduleTime.Start4;
                            time.End = scheduleTime.End4;
                            time.Day_Id = i;
                            time.Time = scheduleTime.Start4 + "-" + scheduleTime.End4;
                            _timeRepository.Update(time);
                            break;
                        case 5:
                            time.Start = scheduleTime.Start5;
                            time.End = scheduleTime.End5;
                            time.Day_Id = i;
                            time.Time = scheduleTime.Start5 + "-" + scheduleTime.End5;
                            _timeRepository.Update(time);
                            break;
                        case 6:
                            time.Start = scheduleTime.Start6;
                            time.End = scheduleTime.End6;
                            time.Day_Id = i;
                            time.Time = scheduleTime.Start6 + "-" + scheduleTime.End6;
                            _timeRepository.Update(time);
                            break;
                        case 7:
                            time.Start = scheduleTime.Start7;
                            time.End = scheduleTime.End7;
                            time.Day_Id = i;
                            time.Time = scheduleTime.Start7 + "-" + scheduleTime.End7;
                            _timeRepository.Update(time);
                            break;
                        default:
                            break;
                    }
                }
                else
                {
                    Assign_Time assign_Time = new Assign_Time();
                    switch (i)
                    {
                        case 1:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = i;
                            assign_Time.Start = scheduleTime.Start1;
                            assign_Time.End = scheduleTime.End1;
                            assign_Time.Time = scheduleTime.Start1 + "-" + scheduleTime.End1;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 2:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = i;//Convert.ToInt32(scheduleTime.day2==""?0: scheduleTime.day2);
                            assign_Time.Start = scheduleTime.Start2;
                            assign_Time.End = scheduleTime.End2;
                            assign_Time.Time = scheduleTime.Start2 + "-" + scheduleTime.End2;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 3:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            //assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day3 == "" ? 0 : scheduleTime.day3);
                            assign_Time.Start = scheduleTime.Start3;
                            assign_Time.Day_Id = i;//
                            assign_Time.End = scheduleTime.End3;
                            assign_Time.Time = scheduleTime.Start3 + "-" + scheduleTime.End3;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 4:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = i;
                            //assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day4==""?0: scheduleTime.day4);
                            assign_Time.Start = scheduleTime.Start4;
                            assign_Time.End = scheduleTime.End4;
                            assign_Time.Time = scheduleTime.Start4 + "-" + scheduleTime.End4;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 5:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            //assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day5 == "" ? 0 : scheduleTime.day5);
                            assign_Time.Day_Id = i;
                            assign_Time.Start = scheduleTime.Start5;
                            assign_Time.End = scheduleTime.End5;
                            assign_Time.Time = scheduleTime.Start5 + "-" + scheduleTime.End5;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 6:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = i;//
                            //assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day6 == "" ? 0 : scheduleTime.day6);
                            assign_Time.Start = scheduleTime.Start6;
                            assign_Time.End = scheduleTime.End6;
                            assign_Time.Time = scheduleTime.Start6 + "-" + scheduleTime.End6;
                            _timeRepository.Insert(assign_Time);
                            break;
                        case 7:
                            assign_Time.User_Id = Convert.ToInt32(scheduleTime.User_Id);
                            assign_Time.Day_Id = i;
                            //assign_Time.Day_Id = Convert.ToInt32(scheduleTime.day7 == "" ? 0 : scheduleTime.day7);
                            assign_Time.Start = scheduleTime.Start7;
                            assign_Time.End = scheduleTime.End7;
                            assign_Time.Time = scheduleTime.Start7 + "-" + scheduleTime.End7;
                            _timeRepository.Insert(assign_Time);
                            break;
                        default:
                            break;
                    }
                }

            }
        }
    }
}