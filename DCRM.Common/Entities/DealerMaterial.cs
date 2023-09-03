using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class DealerMaterial
{
    public int Id { get; set; }

    public long Dealer_Id { get; set; }

    public string Material_Name { get; set; } = null!;

    public float Material_Cost { get; set; }

    public DateTime Material_Date { get; set; }
}
