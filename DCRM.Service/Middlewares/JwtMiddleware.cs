namespace DCRM.Service;

using DCRM.Api.Models;
using DCRM.Common;
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

    public async Task Invoke(HttpContext context, IUserService userService, IJwtUtils jwtUtils)
    {
        var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
        var userId = jwtUtils.ValidateJwtToken(token);
        if (userId != null)
        {
            // attach user to context on successful jwt validation
            context.Items["User"] = userService.GetUserByIdAsync(userId.Value).Result;
        }

        await _next(context);
    }
}