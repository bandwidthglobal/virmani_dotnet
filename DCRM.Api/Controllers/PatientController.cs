using AutoMapper;
using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Common.RequestModel;
using DCRM.Repository.IRepository;
using DCRM.Service.IService;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        public readonly IPatientService _patientService;
        public readonly IAppointmentService _appointmentService;
        public readonly IPrescriptionService _prescriptionService;
        public readonly ITreatmentplanService _treatmentplanService;

        public PatientController(IPatientService patientService, IAppointmentService appointmentService, IPrescriptionService prescriptionService
            , ITreatmentplanService treatmentplanService)
        {

            _patientService = patientService;
            _appointmentService = appointmentService;
            _prescriptionService = prescriptionService;
            _treatmentplanService = treatmentplanService;
        }

        
        [HttpGet("GetAll")]
        public async Task<List<PatientseDto>> GetAllAsync()
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            List<PatientseDto> patientList = _patientService.GetByUserIdAsync(Convert.ToInt32(user.Id));
            return patientList;
        }

        [HttpGet("Get/{id}")]
        public async Task<PatientseDto> GetAsync(int id)
        {
            PatientseDto patient = await _patientService.GetByIdAsync(id);
            return patient;
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public IActionResult Create(PatientRequest request)
        {
            var user = (User)(Request.HttpContext.Items["User"]);
            request.User_Id = user.Id;
            _patientService.CreateAsync(request);
            return Ok("Created");
        }


        [HttpPost("Update")]
        public async Task<IActionResult> Update(PatientRequest request)
        {
            _patientService.Update(request);
            return Ok("Updated");
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
             _patientService.Delete(id);
            return Ok(id);
        }

        [HttpGet("Prescriptions/{patientId}")]
        public List<PrescriptionDto> Prescriptions(int patientId)
        {
            List<PrescriptionDto> prescriptionList = new List<PrescriptionDto>();
           var prescriptions = _prescriptionService.GetPrescriptions(patientId);
            return prescriptions;
           
        }

        [HttpGet("PatientLabData/{patientId}")]
        public List<LabDataDto> PatientLabData(int patientId)
        {
            List<LabDataDto> labDataList = _patientService.GetPatientLabData(patientId);
            return labDataList;
        }

        [HttpGet("PatientTreatmentplans/{patientId}")]
        public List<TreatmentplanDto> PatientTreatmentplans(int patientId)
        {
            List<TreatmentplanDto> treatmentplanList = _patientService.GetPatientTreatmentplanList(patientId);
            return treatmentplanList;
        }

        [HttpGet("PatientPayments/{patientId}")]
        public List<PaymentHistoryDto> PatientPayments(int patientId)
        {
            List<PaymentHistoryDto> paymentList = _patientService.GetPatientpaymentList(patientId);
            return paymentList;
        }

        [HttpPost("Create/Treatmentplan")]
        public IActionResult CreateTreatmentplan(TreatmentplanRequest treatmentplans)
        {
            _treatmentplanService.Create(treatmentplans);
            return Ok("created");
        }
    }
}
