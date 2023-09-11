using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public partial class PatientsContact
{
    public long Id { get; set; }

    [Required]
    public long Patient_Id { get; set; }

    [Required]
   
    public long Phone1 { get; set; }

    public long Phone2 { get; set; }

    public long Phone3 { get; set; }

    public long Phone4 { get; set; }

    public string Email { get; set; } = null!;

    public string Email2 { get; set; } = null!;

    public string Address_R { get; set; } = null!;

    public string City_R { get; set; } = null!;

    public string Zip_R { get; set; } = null!;

    public string Country_R { get; set; } = null!;

    public string Address_O { get; set; } = null!;

    public string City_O { get; set; } = null!;

    public string Zip_O { get; set; } = null!;

    public string Country_O { get; set; } = null!;

    public string Address_Other { get; set; } = null!;

    public string City_Other { get; set; } = null!;

    public long Zip_Other { get; set; }

    public string Country_Other { get; set; } = null!;

    public string Physician { get; set; } = null!;

    public string Reffered_By { get; set; } = null!;

    public string Doctor_Name { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Relationship_Type { get; set; } = null!;

    public string Medical_History_Allergies { get; set; } = null!;

    public string Special_Notes { get; set; } = null!;

    public DateTime? Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
