using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class Dealer
{
    public int Id { get; set; }

    public long User_Id { get; set; }

    public string Company_Name { get; set; } = null!;

    public string Own_Name_1 { get; set; } = null!;

    public string Own_Name_2 { get; set; } = null!;

    public string Phone1 { get; set; } = null!;

    public string Phone2 { get; set; } = null!;

    public string Email1 { get; set; } = null!;

    public string Email2 { get; set; } = null!;

    public string Address_R { get; set; } = null!;

    public string Address_O { get; set; } = null!;

    public string City_R { get; set; } = null!;

    public string Zip_R { get; set; } = null!;

    public string Country_R { get; set; } = null!;

    public string City_O { get; set; } = null!;

    public string Zip_O { get; set; } = null!;

    public string Country_O { get; set; } = null!;

    public string? Staff_Name1 { get; set; }

    public long? Staff_Phone1 { get; set; }

    public string? Staff_Email1 { get; set; }

    public string? Staff_Name2 { get; set; }

    public long? Staff_Phone2 { get; set; }

    public string? Staff_Email2 { get; set; }

    public string? Staff_Name3 { get; set; }

    public long? Staff_Phone3 { get; set; }

    public string? Staff_Email3 { get; set; }

    public string? Staff_Name4 { get; set; }

    public long? Staff_Phone4 { get; set; }

    public string? Staff_Email4 { get; set; }

    public string Gst_Number { get; set; } = null!;

    public string Pan_Number { get; set; } = null!;

    public string? Image { get; set; }

    public sbyte Is_Deleted { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
