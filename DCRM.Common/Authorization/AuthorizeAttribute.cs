namespace DCRM.Common.Authorization;

using DCRM.Common.Dto;
using DCRM.Common.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    //public string _entityName { get; set; }
   public AuthorizeAttribute()
    {
       // _entityName= entityName;
    }
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // skip authorization if action is decorated with [AllowAnonymous] attribute
        var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
        if (allowAnonymous)
            return;
        if (context.HttpContext.Items["User"] != null)
        {
            var user = (User)context.HttpContext.Items["User"];
            if (user == null)
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
        else if (context.HttpContext.Items["Staff"] != null)
        {
            var staff = (StaffDto)context.HttpContext.Items["Staff"];
            if (staff == null)
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
        else if (context.HttpContext.Items["Doctor"] != null)
        {
            var doctor = (DoctorDto)context.HttpContext.Items["DoctorDto"];
            if (doctor == null)
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
        // authorization

    }
}