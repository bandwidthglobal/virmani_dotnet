using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class StaffInsuranceDetail
{
    public long Id { get; set; }

    public long Staff_Id { get; set; }

    public string Insurance { get; set; } = null!;

    public DateTime? Insurance_Date { get; set; }

    public DateTime? Renewal_Date { get; set; }

    public long? Amount_Insured { get; set; }

    public long? Amount_Paid { get; set; }

    public sbyte Allow_Notifications { get; set; }

    public string? Remarks { get; set; }

    public DateTime Updated_At { get; set; }
}
