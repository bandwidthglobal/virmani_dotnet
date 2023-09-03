using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class PatientsInsuranceLoan
{
    public long Id { get; set; }

    public long Patients_Id { get; set; }

    public string Type { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Amount { get; set; } = null!;

    public string Balance_Spent { get; set; } = null!;

    public string Balance_Amount { get; set; } = null!;

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
