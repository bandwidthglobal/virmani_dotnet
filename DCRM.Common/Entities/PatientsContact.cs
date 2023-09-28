using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public partial class PatientsContact
{
    public long Id { get; set; }

    
    public long? Patient_Id { get; set; }

    [Required]
    public long? Phone1 { get; set; }

    public long? Phone2 { get; set; } = 0;

    public long? Phone3 { get; set; } = 0;

    public long? Phone4 { get; set; } = 0;

    public string? Email { get; set; } = string.Empty;

    public string? Email2 { get; set; } = string.Empty;

    public string? Address_R { get; set; } = string.Empty;

    public string? City_R { get; set; } = string.Empty;

    public string? Zip_R { get; set; } = string.Empty;

    public string? Country_R { get; set; } = string.Empty;

    public string? Address_O { get; set; } = string.Empty;

    public string? City_O { get; set; } = string.Empty;

    public string? Zip_O { get; set; } = string.Empty;

    public string? Country_O { get; set; } = string.Empty;

    public string? Address_Other { get; set; } = string.Empty;

    public string? City_Other { get; set; } = string.Empty;

    public long? Zip_Other { get; set; } = 0;

    public string? Country_Other { get; set; } = string.Empty;

    public string? Physician { get; set; } = string.Empty;

    public string? Reffered_By { get; set; } = string.Empty;

    public string? Doctor_Name { get; set; } = string.Empty;

    public string? Phone { get; set; } = "0";

    public string? Relationship_Type { get; set; } = string.Empty;

    public string? Medical_History_Allergies { get; set; } = string.Empty;

    public string? Special_Notes { get; set; } = string.Empty;

    public DateTime? Created_At { get; set; } 

    public DateTime? Updated_At { get; set; }
}
