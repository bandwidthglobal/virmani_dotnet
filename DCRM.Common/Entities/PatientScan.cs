using DCRM.Common.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public  class Patient_Scans:BaseEntity
{
    public int Id { get; set; }

    [Required]
    public long Patient_Id { get; set; }

    public string Scan_Name { get; set; } 

    public string Type { get; set; } 

    public int Status { get; set; }

    public string? Report { get; set; }

    public string? Report_File { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
