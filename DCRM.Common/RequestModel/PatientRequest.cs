using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public partial class PatientRequest
{
    public int Id { get; set; }

    public string Chamber_Id { get; set; } = null!;

    [Required]
    public int User_Id { get; set; }

    public string Mr_Number { get; set; } = null!;

    [Required]
    public string? Name { get; set; }

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


    [DataType(DataType.Password)]
    [StringLength(50, MinimumLength = 8, ErrorMessage = "Password should be minimum 8 characters and a maximum of 20 characters")]
    public string? Password { get; set; }

    public string? Title { get; set; }

    public string? Guardian { get; set; }

    [Required]
    public string? Role { get; set; }

    public string? Verify_Code { get; set; }

    public string? Present_Address { get; set; }

    public string? Permanent_Address { get; set; }

    public int Is_Delete { get; set; }

    public DateTime? Created_At { get; set; }

    public List<PatientsContact>? PatientContacts { get; set; }
    public List<PatientsInsuranceLoan>? PatientInsuranceLoans { get; set; }

    public List<PatientScan>? PatientScans { get; set; }

    public List<PatientTest>? PatientTests { get; set; }
}
