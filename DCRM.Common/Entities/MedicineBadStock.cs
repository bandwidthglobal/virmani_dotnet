using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class MedicineBadStock:BaseEntity
{
    public int Id { get; set; }

    public int Pharmacy_Id { get; set; }

    public DateTime Outward_Date { get; set; }

    public string? Expiry_Date { get; set; }

    public string? Batch_No { get; set; }

    public string? Quantity { get; set; } 

    public string? Note { get; set; } 

    /// <summary>
    /// 0=not delete,1=deleted
    /// </summary>
    public sbyte Is_Deleted { get; set; }
}
