using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class MedicineBatchDetail:BaseEntity
{
    public int Id { get; set; }

    public long Medicine_Id { get; set; }

    public DateTime Inward_Date { get; set; }

    public string? Expiry_Date { get; set; }

    public string Batch_No { get; set; } 

    public string Packing_Qty { get; set; } 

    public string Purchase_Rate_Packing { get; set; } 

    public string Quantity { get; set; } 

    public string? Mrp { get; set; }

    public string? Sale_Rate { get; set; }

    public string? Amount { get; set; }

    public string? Available_Quantity { get; set; }

    /// <summary>
    /// 0=Not deleted,1=deleted
    /// </summary>
    public sbyte Is_Deleted { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
