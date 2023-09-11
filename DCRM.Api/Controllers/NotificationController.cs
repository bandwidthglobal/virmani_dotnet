using DCRM.Common.RequestModel;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DCRM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        public readonly INotificationService _notificationService;
        private readonly ILogger<NotificationController> _logger;
        public NotificationController(INotificationService notificationService, ILogger<NotificationController> logger) {
            _notificationService= notificationService;
            _logger= logger;
        }

        [HttpPost("SendMail")]
        public IActionResult SendMail([FromBody] NotificationRequest notificationRequest) {
            try
            {
                _notificationService.SendMail(notificationRequest);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                throw new Exception(ex.Message);
            }
            return Ok("sent");
        }

        [HttpPost("SendMessage")]
        public IActionResult SendMessage([FromBody] NotificationRequest notificationRequest)
        {
            try
            {
                _notificationService.SendSMS(notificationRequest);
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex.Message);
                throw new Exception(ex.Message);
            }
           
            return Ok("sent");
        }
    }
}
