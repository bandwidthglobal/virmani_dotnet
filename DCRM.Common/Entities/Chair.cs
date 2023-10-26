using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class Chair : BaseEntity
{
    public int Id { get; set; }

    public string Uid { get; set; } 

    public int User_Id { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public long Doctor_Id { get; set; }

    public int? Appoinment_Limit { get; set; }

    public int Status { get; set; }

    public int? Is_Primary { get; set; }

    public DateTime? Created_At { get; set; }
}
