using DCRM.Common.Entities;
using DCRM.Repository.Database;
using DCRM.Repository.IRepository;
using DCRM.Repository.Repository;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Service
{
    public static class DependencyInjection
    {
        /// <summary>
        /// Add DependencyInjection for  config
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            #region Database Inject
            var _configurationBuilder = new ConfigurationBuilder();
            var _path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            _configurationBuilder.AddJsonFile(_path, false);
            var _root = _configurationBuilder.Build();
            var _connectionString = _root.GetSection("ConnectionString").GetSection("DefaultConnection").Value;
            _connectionString += ";Convert Zero Datetime=True";
            services.AddDbContext<DCRMDBContext>(opt => opt .UseMySQL(_connectionString));
            #endregion

            #region Services Inject
            services.AddScoped<ILoginRepository, LoginRepository>();
            services.AddScoped<ILoginService, LoginService>();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            services.AddScoped<IStaffRepository, StaffRepository>();
            services.AddScoped<IStaffService, StaffService>();

            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IDoctorService, DoctorService>();

            services.AddScoped<IDealerRepository, DealerRepository>();
            services.AddScoped<IDealerService, DealerService>();

            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IPatientService, PatientService>();

            services.AddScoped<IDrugRepository,DrugRepository>();
            services.AddScoped<IDurgService, DurgService>();

            services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
            services.AddScoped<IPrescriptionService, PrescriptionService>();

            services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            services.AddScoped<IAppointmentService, AppointmentService>();

            services.AddScoped<ITreatmentplanRepository, TreatmentplanRepository>();
            services.AddScoped<ITreatmentplanService, TreatmentplanService>();

            services.AddScoped<IDashboardRepository, DashboardRepository>();
            services.AddScoped<IDashboardService, DashboardService>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IWorkDoneNewService, WorkDoneNewService>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddScoped<ILabService, LabService>();
            services.AddScoped<IDigitalDataService, DigitalDataService>();
            services.AddScoped<IChairService, ChairService>();
            services.AddScoped<IWorkDoneService, WorkDoneService>();
            services.AddScoped<IFileRepository, FileRepository>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IExperienceService, ExperienceService>();
            services.AddScoped<IForgotPasswordService, ForgotPasswordService>();
            services.AddScoped<ISettingService, SettingService>();
            #endregion
            return services;
        }
    }
}
