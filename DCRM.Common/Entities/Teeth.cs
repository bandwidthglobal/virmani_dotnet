using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class Teeth:BaseEntity
{
    public int Id { get; set; }

    public int Teeth_Cat { get; set; }

    public string Teeth_Number { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string Teeth_Note { get; set; } = null!;
}
