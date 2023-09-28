using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public  class LabDataDto
{
    public long Id { get; set; }

    public long Patient_Id { get; set; }

    public long Doctor_Id { get; set; }

    public string DoctorName { get; set; }

    public long Treatment_Id { get; set; }

    public string Treatment { get; set; }

    public long Workdone_Id { get; set; }

    public string Workdone { get; set; }

    public string Prosthesis_Type { get; set; } = null!;

    public string Arch { get; set; } = null!;

    public string Teeth_Number { get; set; } = null!;

    public DateTime Impression_Date { get; set; }

    public string Shade { get; set; } = null!;

    public string Lab_Instructions { get; set; } = null!;

    public string Laboratory_Name { get; set; } = null!;

    public DateTime Send_Date { get; set; }

    public DateTime Due_Date { get; set; }

    public string Notes { get; set; } = null!;

    /// <summary>
    /// 0=not deleted,1=deleted
    /// </summary>
    public int Is_Deleted { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
    public object TreatmentCode { get; set; }
}
