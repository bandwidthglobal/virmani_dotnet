using AutoMapper;
using DCRM.Api.Models;
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
        private readonly IFileService _fileService;
        public readonly IConfiguration _configuration;
        IWebHostEnvironment _env;
        string rootDirectory = string.Empty;
        public PatientController(IPatientService patientService, IAppointmentService appointmentService, IPrescriptionService prescriptionService
            , ITreatmentplanService treatmentplanService, IFileService fileService, IWebHostEnvironment env, IConfiguration configuration)
        {

            _patientService = patientService;
            _appointmentService = appointmentService;
            _prescriptionService = prescriptionService;
            _treatmentplanService = treatmentplanService;
            _fileService = fileService;
            _env = env;
            _configuration = configuration;
        }


        [HttpGet("GetAll")]
        public async Task<List<PatientseDto>> GetAll()
        {
            var user = Request.HttpContext.Items["User"] as User;
            List<PatientseDto> patientList = _patientService.GetAll(user.Id);
            if (patientList.Count > 0)
            {
                patientList = patientList.OrderByDescending(x => x.Id).ToList();
            }
            return patientList;
        }

        [HttpGet("Get/{id}")]
        public async Task<PatientseDto> GetAsync(long id)
        {
            PatientseDto patient = _patientService.Get(id);
            return patient;
        }

        [HttpPost("Create")]
        public IActionResult Create(PatientRequest request)
        {
            var user = Request.HttpContext.Items["User"] as User;
            request.User_Id = user.Id;
            var patientId = _patientService.Create(request);
            return Ok(patientId);
        }


        [HttpPost("Update")]
        public async Task<IActionResult> Update(PatientRequest request)
        {
            _patientService.Update(request);
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(long id)
        {
            _patientService.Delete(id);
            return Ok(id);
        }

        [HttpGet("Get/Names")]
        public List<DropdownDataDto> PatientNameList()
        {
            var user = Request.HttpContext.Items["User"] as User;
            return _patientService.NameList(user.Id);
        }
        [HttpGet("Get/Appointments/{patientId}")]
        public List<AppointmentDto> GetPatientAppointment(int patientId)
        {
            try
            {
                return _appointmentService.GetByPatientId(patientId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        [HttpGet("Get/Treatmentplans/{patientId}")]
        public List<TreatmentplanDto> Treatmentplans(int patientId)
        {
            List<TreatmentplanDto> treatmentplanList = _patientService.GetPatientTreatmentplanList(patientId);
            return treatmentplanList;
        }
        [HttpGet("Get/Prescriptions/{patientId}")]
        public List<PrescriptionDto> Prescriptions(long patientId)
        {
            return _prescriptionService.GetPatientPrescriptions(patientId);
        }
        [HttpGet("Get/Payments/{patientId}")]
        public List<PaymentHistoryDto> Payments(int patientId)
        {
            List<PaymentHistoryDto> paymentList = _patientService.GetPatientpaymentList(patientId);
            return paymentList;
        }

        [HttpPost("Create/Treatmentplan")]
        public IActionResult CreateTreatmentplan(TreatmentplanRequest treatmentplans)
        {
          long id=  _treatmentplanService.Create(treatmentplans);
            return Ok(id);
        }

        [HttpGet("Get/WorkDones/{patientId}")]
        public List<WorkDoneDto> WorkDones(int patientId)
        {
            List<WorkDoneDto> workdoneList = _patientService.GetPatientWorkDoneList(patientId);
            return workdoneList;
        }

        [HttpGet("Get/ReferBy/{patientId}")]
        public ReferBy ReferBy(long patientId)
        {
            return _patientService.GetReferBy(patientId);
        }


    }
}
