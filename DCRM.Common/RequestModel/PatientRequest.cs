using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public  class PatientRequest
{
    public long Id { get; set; }

    public string? Chamber_Id { get; set; } 

    public long User_Id { get; set; }

    public string? Mr_Number { get; set; }

    [Required]
    public string Name { get; set; }

    public string? User_name { get; set; }

    public string? Slug { get; set; }

    public string? Thumb { get; set; }

    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string? Email { get; set; }

    public sbyte? Age { get; set; }

    public int? Weight { get; set; }

    public string? Sex { get; set; }

    public string? Mobile { get; set; }

    public string? Password { get; set; }

    public string? Title { get; set; }

    public string? Guardian { get; set; }

    public string? Role { get; set; }

    public string? Verify_Code { get; set; }

    public string? Present_Address { get; set; }

    public string? Permanent_Address { get; set; }

    public int? Is_Delete { get; set; }

    public DateTime? Created_At { get; set; }

    public List<PatientsContact>? PatientContacts { get; set; }
    public List<PatientsInsuranceLoan>? PatientInsuranceLoans { get; set; }

    public List<Patient_Scans>? PatientScans { get; set; }

    public List<PatientTest>? PatientTests { get; set; }
}
