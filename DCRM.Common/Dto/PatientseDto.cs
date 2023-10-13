using DCRM.Common.Entity;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public partial class PatientseDto
{
    public int Id { get; set; }

    public string Chamber_Id { get; set; } = null!;

    public int User_Id { get; set; }

    public string Mr_Number { get; set; } = null!;

    public string? Name { get; set; }

    public string? ChamberName { get; set; }

    public string? ChamberTitle { get; set; }
    public string? User_name { get; set; }

    public string? Slug { get; set; }

    public string? Thumb { get; set; }

    public string? Email { get; set; }

    public sbyte? Age { get; set; }

    public int? Weight { get; set; }

    public string? Sex { get; set; }

    public string? Mobile { get; set; }

    public string? Title { get; set; }

    public string? Guardian { get; set; }

    public string? Role { get; set; }

    public string? Verify_Code { get; set; }

    public string? Present_Address { get; set; }

    public string? Permanent_Address { get; set; }

    public int Is_Delete { get; set; }

    public DateTime? Created_At { get; set; }

    public List<PatientsContact>? PatientContacts { get; set; }
    public List<PatientsInsuranceLoan>? PatientInsuranceLoans { get; set; }

    public List<Patient_Scans>? PatientScans { get; set; }

    public List<PatientTest>? PatientTests { get; set; }
    public double AddvancePayment { get; set; }
    public double DuePayment { get; set; }
    public double TotalBalence { get; set; }
}
