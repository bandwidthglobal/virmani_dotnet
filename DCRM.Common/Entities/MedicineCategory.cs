using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class MedicineCategory:BaseEntity
{
    public int Id { get; set; }

    public string Medicine_Category { get; set; } = null!;
}
