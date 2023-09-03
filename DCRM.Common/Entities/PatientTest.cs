using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class PatientTest
{
    public int Id { get; set; }

    public long Patient_Id { get; set; }

    public string Test_Name { get; set; } = null!;

    public DateTime Report_Date { get; set; }

    public string Test_Price { get; set; } = null!;

    public int Status { get; set; }

    public string Report { get; set; } = null!;

    public string? Report_File { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
