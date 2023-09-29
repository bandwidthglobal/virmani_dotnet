using DCRM.Common.Authorization;
using DCRM.Common.Entities;
using DCRM.Service.IService;
using Demo_Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/Payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("Create")]
        public IActionResult Create(Payment_History paymentHistory)
        {

            try
            {
                _paymentService.Create(paymentHistory);
                return Ok("created");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }


        }

        [HttpPost("Update")]
        public IActionResult Update(Payment_History paymentHistory)
        {

            try
            {
                _paymentService.Update(paymentHistory);
                return Ok(paymentHistory);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }


        }

        [HttpPost("Delete/{id}")]
        public IActionResult Delete(long id)
        {

            try
            {
                _paymentService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }


        }
        [HttpGet("Get/{id}")]
        public Payment_History Get(long id)
        {
            return _paymentService.Get(id);
        }

        [HttpPost("Create/Received")]
        public IActionResult CreateReceive(Payment_Details_List payment_Details_List)
        {
            try
            {
                _paymentService.CreateReceivePayment(payment_Details_List);
                return Ok("created");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);

            }
        }

        [HttpGet("Get/Received/{paymentId}")]
        public List<Payment_Details_List> GetReceived(long paymentId)
        {
            return _paymentService.GetReceivedPayment(paymentId);
        }
    }
}
