using DCRM.Common.Entity;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public class StaffDto
{
    public int Id { get; set; }

    public int User_Id { get; set; }

    public int Chamber_Id { get; set; }

    public string? Thumb { get; set; }

    public string Name { get; set; } = null!;

    public string? User_Name { get; set; }

    public string? Email { get; set; }

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

    public string? Phone { get; set; }

    public string? Qualification { get; set; }

    public string? Work_Experience { get; set; }

    public string? Specialization { get; set; }

    public string? Note { get; set; }

    public string? Current_Address { get; set; }

    public string? Permanent_Address { get; set; }

    public string? Pan { get; set; }

    public string? Gst { get; set; }

    /// <summary>
    /// 0=not deleted,1=deleted
    /// </summary>
    public sbyte Is_Deleted { get; set; }

    public DateTime? Created_At { get; set; }

    public List<StaffBankDetail>? StaffBankList { get; set; }

    public List<StaffInsuranceDetail>? StaffInsuranceList { get; set; }

    public List<StaffVaccination>? StaffVaccinationList { get; set; }



}
