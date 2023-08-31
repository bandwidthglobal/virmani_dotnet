using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class DoctorsAddress
{
    public long Id { get; set; }

    public int Doctor_Id { get; set; }

    public string Address_R { get; set; } = null!;

    public string City_R { get; set; } = null!;

    public long Zip_R { get; set; }

    public string Country_R { get; set; } = null!;

    public string? Address_O { get; set; }

    public string? City_O { get; set; }

    public long? Zip_O { get; set; }

    public string? Country_O { get; set; }

    public string? Address_Other { get; set; }

    public string? City_Other { get; set; }

    public long? Zip_Other { get; set; }

    public string? Country_Other { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
