using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public partial class PatientScan
{
    public int Id { get; set; }

    [Required]
    public long Patient_Id { get; set; }

    public string Scan_Name { get; set; } = null!;

    public string Type { get; set; } = null!;

    public int Status { get; set; }

    public string? Report { get; set; }

    public string? Report_File { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
