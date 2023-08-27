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
            #region Database Connection
            var _configurationBuilder = new ConfigurationBuilder();
            var _path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            _configurationBuilder.AddJsonFile(_path, false);
            var _root = _configurationBuilder.Build();
            var _connectionString = _root.GetSection("ConnectionString").GetSection("DefaultConnection").Value;
            services.AddDbContext<DCRMDBContext>(opt => opt .UseMySQL(_connectionString));
            #endregion

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
