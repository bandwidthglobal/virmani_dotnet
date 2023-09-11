using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class Chair
{
    public int Id { get; set; }

    public string Uid { get; set; } = null!;

    public int UserId { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public long DoctorId { get; set; }

    public int? AppoinmentLimit { get; set; }

    public int Status { get; set; }

    public int? IsPrimary { get; set; }

    public DateTime? CreatedAt { get; set; }
}
