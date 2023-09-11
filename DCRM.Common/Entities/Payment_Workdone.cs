using System;
using System.Collections.Generic;

namespace DCRM.Common.Entities;

public partial class Payment_Workdone:BaseEntity
{
    public int Id { get; set; }

    public int Patient_Id { get; set; }

    public float Paid_Amount { get; set; }

    public int Balance_Amount { get; set; }

    public int Total_Amount { get; set; }

    public string Payment_Mode { get; set; } = null!;

    public string Note { get; set; } = null!;

    public DateTime Date { get; set; }

    public string? Document { get; set; }
}
