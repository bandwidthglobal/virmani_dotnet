using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public  class Prescription
{
    public int Id { get; set; }

    public long Chamber_Id { get; set; }
   
    public long User_Id { get; set; }

    [Required]
    public long Patient_Id { get; set; }
    [Required]
    public string Drug_Id { get; set; } = null!;

    public string Next_Duration { get; set; } = null!;

    public string Next_Time { get; set; } = null!;

    public int? Check_Report { get; set; }

    public string? Feedback { get; set; }

    public DateTime Created_At { get; set; }
}
