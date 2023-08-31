using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Dto;

public class DoctorDto
{
    public long Id { get; set; }

    public long User_Id { get; set; }

    public string? Thumb { get; set; }

    public string Name { get; set; } = null!;

    public string Gender { get; set; } = null!;

    public DateTime Dob { get; set; }

    public int Age { get; set; }

    public string? Marital_Status { get; set; }

    public string? Blood_Group { get; set; }

    public string? Qualification { get; set; }

    public string Email { get; set; } = null!;

    public string? Email2 { get; set; }

    public string? Password { get; set; }

    public string Role { get; set; } = null!;

    public string? Speciality { get; set; }

    public long? Phone1 { get; set; }

    public long? Phone2 { get; set; }

    public long? Phone3 { get; set; }

    public long? Phone4 { get; set; }

    public string Pan_Number { get; set; } = null!;

    public string? Gst_Number { get; set; }

    public sbyte? Is_Delete { get; set; }

    public DateTime? Created_At { get; set; }

    public DateTime Updated_At { get; set; }

    public List<DoctorBankDetail>? DoctorBankDetailList { get; set; }

    public List<DoctorInsuranceDetail>? DoctorInsuranceDetailList { get; set; }

    public List<DoctorsVaccination>? DoctorsVaccinationList { get; set; }

    public List<DoctorsAddress>? DoctorsAddressList { get; set; }

}
