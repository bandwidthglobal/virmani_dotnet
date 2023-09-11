using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public class Teethinfo:BaseEntity
{
    public int Id { get; set; }

    public long Tooth_Patient_Id { get; set; }

    public int Teeth_Id { get; set; }

    public string Teeth_Number_Note { get; set; } = null!;

    public long Doc_Id { get; set; }

    public string Toth_Note { get; set; } = null!;

    public string Treatment_Notes { get; set; } = null!;

    public DateTime Date { get; set; }

    public int Workdone_Id { get; set; }

    public long Treatmentplans_Id { get; set; }

    public string Rmd { get; set; } = null!;

    public DateTime? Added_Date { get; set; }

    public string Note_Status { get; set; } = null!;

    public string Type { get; set; } = null!;

    public string Ord { get; set; } = null!;

    public int? Sitting { get; set; }
}
