using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class DoctorsVaccination
{
    public long Id { get; set; }

    public long Doctor_Id { get; set; }

    public int Vaccination_Type { get; set; }

    public DateTime Vaccination_Date { get; set; }

    public DateTime Reminder_Date_For_Next { get; set; }

    public string? Remarks { get; set; }

    public string? Medical_History { get; set; }

    public DateTime Updated_At { get; set; }
}
