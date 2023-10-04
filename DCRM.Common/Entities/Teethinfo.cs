using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public class Teethinfo:BaseEntity
{
    public int Id { get; set; }

    public long Tooth_Patient_Id { get; set; }

    public int Teeth_Id { get; set; }

    public string? Teeth_Number_Note { get; set; } 

    public long Doc_Id { get; set; }

    public string? Toth_Note { get; set; } 

    public string? Treatment_Notes { get; set; } 

    public DateTime Date { get; set; }

    public int Workdone_Id { get; set; }

    public long Treatmentplans_Id { get; set; }

    public string? Rmd { get; set; } 

    public DateTime? Added_Date { get; set; }

    public string? Note_Status { get; set; } 

    public string? Type { get; set; } 

    public string? Ord { get; set; } 

    public int? Sitting { get; set; }
}
