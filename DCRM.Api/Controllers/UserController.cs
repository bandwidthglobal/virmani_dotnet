using DCRM.Common;
using DCRM.Common.Authorization;
using DCRM.Common.Dto;
using DCRM.Common.Entity;
using DCRM.Service.Service;
using Microsoft.AspNetCore.Mvc;
using DCRM.Api.Models;
using DCRM.Service.IService;
using AutoMapper;
using System;
using DCRM.Service;
using DCRM.Common.Request;
using Newtonsoft.Json.Linq;
using DCRM.Common.RequestModel;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DCRM.Api.Controllers
{
    [Authorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserService _userService;
        //public readonly IStaffService _staffService;
        //public readonly IDoctorService _doctorService;
        //public readonly IPatientService _patientService;
        //public readonly IAppointmentService _appointmentService;
        //public readonly IPrescriptionService _prescriptionService;
        //public readonly ITreatmentplanService _treatmentplanService;
        private readonly IMapper _mapper;

        
        public UserController(IUserService userService, IMapper mapper, IConfiguration configuration, 
            IStaffService staffService, IDoctorService doctorService, IPatientService patientService, 
            IAppointmentService appointmentService, IPrescriptionService prescriptionService, ITreatmentplanService treatmentplanService)
        {

            _userService = userService;
            _mapper = mapper;
            //_staffService = staffService;
            //_doctorService = doctorService;
            //_patientService = patientService;
            //_appointmentService = appointmentService;
            //_prescriptionService = prescriptionService;
            //_treatmentplanService = treatmentplanService;
        }

        [HttpGet("GetAll")]
        public async Task<IEnumerable<UserDto>> GetUsersAsync()
        {
           
            List<UserDto> userList = _mapper.Map<List<UserDto>>(await _userService.GetUsersAsync());
            return userList;
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
         
            if (user!=null)
            {
                UserDto userDetails = _mapper.Map<UserDto>(user);
                return Ok(userDetails);
            }
            else
            {
                throw new KeyNotFoundException("No record found");
            }
        }

        [AllowAnonymous]
        [HttpPost("Create")]
        public async Task<IActionResult> Create(UserRequest userRequestModel)
        {
            await _userService.SaveUserAsync(userRequestModel);
            return  Ok("created");
        }
       
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] UserUpdateRequest userUpdateRequestModel)
        {
            
                await _userService.UpdateUserAsync(userUpdateRequestModel);
                return Ok("updated");
               
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.DeleteUserAsync(id);
            return Ok("deleted");
        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePasswordAsync(ChangePasswordRequest model)
        {
            await _userService.ChangeUserPasswordAsync(model);
            return Ok("changed");
        }


        //[HttpPost("CreateStaff")]
        //public async Task<IActionResult> CreateStaff([FromBody] StaffRequest staffRequest)
        //{
        //    await _staffService.CreateStaffByUserAsync(staffRequest);
        //    return Ok("created");
        //}

        //[HttpPost("GetStaffByUser/{userId}")]
        //public  IActionResult GetStaffByUser(int userId)
        //{
        //  var staffList=  _staffService.GetStaffsByUserId(userId);
        //    return Ok(staffList);
        //}

        //[HttpPost("CreateDoctor")]
        //public async Task<IActionResult> CreateDoctor([FromBody] DoctorRequest request)
        //{
        //    await _doctorService.CreateDoctorAsync(request);
        //    return Ok("created");
        //}

        //[HttpGet("GetPatients/{userId}")]
        //public async Task<IEnumerable<PatientseDto>> GetPatientsAsync(int userId)
        //{

        //    var patientList =  _patientService.GetByUserIdAsync(userId);
        //    return patientList;
        //}

        //[AllowAnonymous]
        //[HttpPost("CreatePatient")]
        //public async Task<IActionResult> CreatePatient([FromBody] PatientRequest request)
        //{
        //     _patientService.CreateAsync(request);
        //    return Ok("created");
        //}
        //[AllowAnonymous]
        //[HttpPost("UpdatePatient")]
        //public IActionResult UpdatePatient([FromBody] PatientRequest request)
        //{
        //     _patientService.Update(request);
        //    return Ok("updated");
        //}

        //[HttpGet("DeletePatient/{patientId}")]
        //public async Task<IActionResult> DeletePatient(Int32 patientId)
        //{
        //   await _patientService.DeleteAsync(patientId);
        //    return Ok("created");
        //}

        

        //[HttpGet("GetPrescriptions/{patientId}")]
        //public List<PrescriptionDto> GetPrescriptionsByPatientId(int patientId)
        //{
        //    var user = (User)(Request.HttpContext.Items["User"]);
        //    List<PrescriptionDto> prescriptions = _prescriptionService.GetPrescriptions(user.Id, patientId);
        //    return prescriptions;
        //}

        //[HttpGet("GetPatientScans/{patientId}")]
        //public List<PatientScan> GetPatientScans(int patientId)
        //{
        //    List<PatientScan> patientScans = _patientService.GetPatientScan(patientId);
        //    return patientScans;
        //}

        //[HttpGet("GetPatientLabData/{patientId}")]
        //public List<LabDataDto> GetPatientLab(int patientId)
        //{
        //    List<LabDataDto> labDataList = _patientService.GetPatientLabData(patientId);
        //    return labDataList;
        //}

        //[HttpGet("GetPatientTreatmentplans/{patientId}")]
        //public List<TreatmentplanDto> GetPatientTreatmentplan(int patientId)
        //{
        //    List<TreatmentplanDto> treatmentplanList = _patientService.GetPatientTreatmentplanList(patientId);
        //    return treatmentplanList;
        //}

        //[HttpGet("GetPatientPayments/{patientId}")]
        //public List<PaymentHistoryDto> GetPatientPaymentList(int patientId)
        //{
        //    List<PaymentHistoryDto> paymentList = _patientService.GetPatientpaymentList(patientId);
        //    return paymentList;
        //}

       
    }
}
