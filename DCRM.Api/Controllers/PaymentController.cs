using DCRM.Common.Authorization;
using DCRM.Common.Entities;
using DCRM.Service.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        PaymentController(IPaymentService paymentService)
        {
             _paymentService=paymentService;
        }

        [HttpPost("CreatePaymentHistory")]
        public IActionResult CreatePaymentHistory(Payment_History paymentHistory) {

            try
            {
                _paymentService.CreatePaymentHistory(paymentHistory);
                return Ok("created");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
               
            }
           

        }
    }
}
