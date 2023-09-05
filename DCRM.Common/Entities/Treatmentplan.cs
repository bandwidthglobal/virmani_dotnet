using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public  class Treatmentplan
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int Doctor { get; set; }

    public string Job { get; set; } = null!;

    public int JobId { get; set; }

    public int Status { get; set; }

    public int PatientId { get; set; }

    public float Amount { get; set; }

    public string Courtesy { get; set; } = null!;

    public int WorkdoneId { get; set; }

    public string PrintToothName { get; set; } = null!;

    public string IndividualToothWrk { get; set; } = null!;

    public string CompletedDate { get; set; } = null!;

    public int SittingStatus { get; set; }

    public sbyte TreatmentStatus { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
