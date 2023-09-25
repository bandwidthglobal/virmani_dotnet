using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public  class TreatmentplanDto
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int Doctor { get; set; }

    public string? DoctorName { get; set; }

    public string? Job { get; set; } 

    public int JobId { get; set; }

    public int Status { get; set; }

    public int Sitting { get; set; }

    public int PatientId { get; set; }

    public float Amount { get; set; }

    public string? Courtesy { get; set; }

    public int WorkdoneId { get; set; }

    public string? PrintToothName { get; set; } 

    public string? IndividualToothWrk { get; set; }

    public string? CompletedDate { get; set; } 

    public int SittingStatus { get; set; }

    public string? TreatmentStatus { get; set; }

    public string? Type { get; set; }

    public string? TeethNumber { get; set; } 
    public string? TothNot { get; set; } 

    public int?  WorkDoneStatus { get; set; }  
    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
