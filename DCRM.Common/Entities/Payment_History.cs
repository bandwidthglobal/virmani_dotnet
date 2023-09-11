using System;
using System.Collections.Generic;

namespace DCRM.Common.Entities;

public partial class Payment_History:BaseEntity
{
    public long Id { get; set; }

    public long Doctor_Id { get; set; }

    public long Patient_Id { get; set; }

    public long Workdone_Id { get; set; }

    public string Description { get; set; } = null!;

    public double Credit_Amount { get; set; }

    public double Debit_Amount { get; set; }

    /// <summary>
    /// 0=credit,1=debit
    /// </summary>
    public sbyte Amount_Type { get; set; }

    public double Balance { get; set; }

    public string Payment_Mode { get; set; } = null!;

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
