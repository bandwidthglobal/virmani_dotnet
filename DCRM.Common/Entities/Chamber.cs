using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class Chamber: BaseEntity
{
    public int Id { get; set; }

    public string Uid { get; set; } = null!;

    public int User_Id { get; set; }

    public string? Name { get; set; }

    public string? Slug { get; set; }

    public int Type { get; set; }

    public string? Title { get; set; }

    public string? Address { get; set; }

    public string? Category { get; set; }

    public int? Chamber_Type { get; set; }

    public int? Appoinment_Limit { get; set; }

    public string? Logo { get; set; }

    public int Status { get; set; }

    public int? Is_Primary { get; set; }

   
}
