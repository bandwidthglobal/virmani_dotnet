namespace DCRM.Service;
using DCRM.Api.Models;
using DCRM.Common;
using DCRM.Common.Entity;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;
    private readonly AppSettings _appSettings;

    public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
    {
        _next = next;
        _appSettings = appSettings.Value;
    }

    public async Task Invoke(HttpContext context, IUserService userService, IStaffService staffService, IDoctorService doctorService, IPatientService patientService, IJwtUtils jwtUtils)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var user = jwtUtils.ValidateJwtToken(token);
        if (user != null)
        {
            // attach user to context on successful jwt validation
            if (user.Role.ToLower()=="user" || user.Role.ToLower() == "admin")
            {
                context.Items["User"] = userService.Get(user.Id);
            }
            else if (user.Role.ToLower() == "doctor")
            {
                context.Items["Doctor"] = doctorService.Get(user.Id);
            }
            else if (user.Role.ToLower() == "staff")
            {
                context.Items["Staff"] = staffService.Get(user.Id);
            }
            else if (user.Role.ToLower() == "patient")
            {
                context.Items["Patient"] = patientService.Get(user.Id);
            }
            
        }

        await _next(context);
    }
}