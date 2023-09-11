using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public class StaffRequest
{
    public int Id { get; set; }

    public int User_Id { get; set; }

    public int Chamber_Id { get; set; }

    public string? Thumb { get; set; }


    [Required]
    public string Name { get; set; } = null!;

    public string? User_Name { get; set; }

    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string? Email { get; set; }

    [DataType(DataType.Password)]
    [StringLength(50, MinimumLength = 8, ErrorMessage = "Password should be minimum 8 characters and a maximum of 20 characters")]
    public string? Password { get; set; }

    public string? Role { get; set; }

    public string? Slug { get; set; }

    public string? Designation { get; set; }

    public int Status { get; set; }

    public int? Department { get; set; }

    public string? Father { get; set; }

    public string? Mother { get; set; }

    public string? Gender { get; set; }

    public string? Marital_Status { get; set; }

    public string? Blood_Group { get; set; }

    public string? Dob { get; set; }

    public string? Date_Of_Joining { get; set; }

    [Required]
    [DataType(DataType.PhoneNumber)]
    [StringLength(10, MinimumLength = 10, ErrorMessage = "Phone should be minimum 10 characters and a maximum of 10 characters")]
    [Phone]
    public string? Phone { get; set; }

    public string? Qualification { get; set; }

    public string? Work_Experience { get; set; }

    public string? Specialization { get; set; }

    public string? Note { get; set; }

    [Required]
    public string? Current_Address { get; set; }

    public string? Permanent_Address { get; set; }

    public string? Pan { get; set; }

    public string? Gst { get; set; }

    public sbyte Is_Deleted { get; set; }

    public DateTime? Created_At { get; set; }

    public List<StaffBankDetail>? StaffBankDetail { get; set; }

    public List<StaffInsuranceDetail>? StaffInsuranceDetail { get; set; }

    public List<StaffVaccination>? StaffVaccination { get; set; }
    
}
