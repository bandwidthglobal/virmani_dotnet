using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class TeethCategory:BaseEntity
{
    public int Id { get; set; }

    public string Teeth_Category_Name { get; set; } = null!;
}
