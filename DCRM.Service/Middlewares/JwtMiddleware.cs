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

    public async Task Invoke(HttpContext context, IUserService userService, IStaffService staffService, IDoctorService doctorService, IJwtUtils jwtUtils)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var user = jwtUtils.ValidateJwtToken(token);
        if (user != null)
        {
            // attach user to context on successful jwt validation
            if (user.Role=="user" || user.Role=="admin")
            {
                context.Items["User"] = userService.GetUserByIdAsync(user.Id).Result;
            }
            else if (user.Role == "doctor")
            {
                context.Items["Doctor"] = doctorService.GetDoctorByIdAsync(user.Id).Result;
            }
            else if (user.Role == "staff")
            {
                context.Items["Staff"] = staffService.GetStaffByIdAsync(user.Id).Result;
            }

        }

        await _next(context);
    }
}