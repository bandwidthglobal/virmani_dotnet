using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class Tooth:BaseEntity
{
    public int Id { get; set; }

    public int TeethCat { get; set; }

    public string TeethNumber { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string TeethNote { get; set; } = null!;
}
