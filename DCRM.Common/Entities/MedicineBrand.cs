using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class MedicineBrand
{
    public int Id { get; set; }

    public string Medicine_Brand { get; set; } = null!;

    public string Basic_Salt { get; set; } = null!;

    public string Company_Name { get; set; } = null!;
}
