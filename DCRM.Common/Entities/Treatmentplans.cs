using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public  class Treatmentplans:BaseEntity
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    public int Doctor { get; set; }

    public string Job { get; set; } = null!;

    public int Job_Id { get; set; }

    public int Status { get; set; }

    public int Patient_Id { get; set; }

    public float Amount { get; set; }

    public string Courtesy { get; set; } = null!;

    public int Workdone_Id { get; set; }

    public string Print_Tooth_Name { get; set; } = null!;

    public string Individual_Tooth_Wrk { get; set; } = null!;

    public string Completed_Date { get; set; } = null!;

    public int Sitting_Status { get; set; }

    public sbyte Treatment_Status { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
