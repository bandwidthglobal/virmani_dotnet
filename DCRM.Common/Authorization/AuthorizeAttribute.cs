namespace DCRM.Common.Authorization;

using DCRM.Common.Dto;
using DCRM.Common.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public string _entityName { get; set; }
   public AuthorizeAttribute(string entityName)
    {
        _entityName= entityName;
    }
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // skip authorization if action is decorated with [AllowAnonymous] attribute
        var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
        if (allowAnonymous)
            return;
        User user = new User();
        StaffRequest staff = new StaffRequest();
        DoctorRequest doctor1 = new DoctorRequest();
        if (_entityName== "User")
        {
            user = (User)context.HttpContext.Items["User"];
            if (user == null)
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
        else if (_entityName == "Staff")
        {
            staff = (StaffRequest)context.HttpContext.Items["Staff"];
            if (staff == null)
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
        else if (_entityName == "Doctor")
        {
            var doctor = context.HttpContext.Items["Doctor"];
            if (doctor == null)
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
        // authorization
        
    }
}