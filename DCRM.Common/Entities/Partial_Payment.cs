using System;
using System.Collections.Generic;

namespace DCRM.Common.Entities;

public partial class Partial_Payment
{
    public int Id { get; set; }

    public string AmtDueCurrentWork { get; set; } = null!;

    public string IfAnyAmt { get; set; } = null!;

    public string PrevBalAmt { get; set; } = null!;

    public string AdvAmt { get; set; } = null!;

    public string PendingAmount { get; set; } = null!;

    public string WkPatientId { get; set; } = null!;

    public string WorkdoneId { get; set; } = null!;

    public DateTime Date { get; set; }
}
