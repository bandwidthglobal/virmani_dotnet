using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public  class Workdone:BaseEntity
{
    public int Id { get; set; }

    public string Patient_Name { get; set; } = null!;

    public string Workdone_Date { get; set; } = null!;

    public int? Workdoneon_Id { get; set; }

    public string Workdoneon { get; set; } = null!;

    /// <summary>
    /// (Doctor ID)
    /// </summary>
    public long Workdone_Doc { get; set; }

    public string? Notesdiagnosis { get; set; }

    public double Estimate { get; set; }

    public string Amt_Due_Current_Work { get; set; } = null!;

    public long Discount { get; set; }

    public string If_Any_Amt { get; set; } = null!;

    public string Prev_Bal_Amt { get; set; } = null!;

    public string Adv_Amt { get; set; } = null!;

    public int Print_Tooth_Id { get; set; }

    public string? Print_Tooth_Name { get; set; }

    public string? Individual_Tooth_Wrk { get; set; }

    public long Wk_Patient_Id { get; set; }

    public string Rmd { get; set; } = null!;

    public DateTime? Added_Date { get; set; }

    public int Wrk_Apt_Id { get; set; }
    
    public int Status { get; set; }
}
