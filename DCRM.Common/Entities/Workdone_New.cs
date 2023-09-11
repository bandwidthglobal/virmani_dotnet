using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public  class Workdone_New:BaseEntity
{
    public int Id { get; set; }

    public long Treatment_Id { get; set; }

    public int Doctor_Id { get; set; }

    public double Estimated_Amount { get; set; }

    public double Current_Work_Amt { get; set; }

    public double Discount { get; set; }

    public double Total_Amt { get; set; }
    
    public int Workdone_Status { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
