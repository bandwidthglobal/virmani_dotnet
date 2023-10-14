using DCRM.Common.Entity;
using System;
using System.Collections.Generic;

namespace DCRM.Common.RequestModel;

public  class TreatmentplanRequest
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int Doctor { get; set; }

    public string Job { get; set; } = null!;

    public int JobId { get; set; }

    public string? Type { get; set; }

    public int Status { get; set; }

    public int PatientId { get; set; }

    public float Amount { get; set; }

    public string? Courtesy { get; set; }

    public float Estimated_Amount { get; set; }

    public string? PrintToothName { get; set; } 

    public string? IndividualToothWrk { get; set; }

    public string? CompletedDate { get; set; } 

    public int SittingStatus { get; set; }

    public sbyte TreatmentStatus { get; set; }

    public int Teeth_id { get; set; }

    public string? Teeth_Number_Note { get; set; }
    public string? Toth_Note { get; set; }
    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public string? Note_Status { get; set; }
    public string Ord { get; set; }
    public string Rmd { get; set; }
    public string Treatment_Notes { get; set; }
}
