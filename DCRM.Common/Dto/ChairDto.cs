using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public partial class ChairDto 
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public long Doctor_Id { get; set; }
    public string? DoctorName { get; set; }
    public string? Appoinment_Limit { get; set; }
    public string? Status { get; set; }
    public string? Is_Primary { get; set; }
    public string? Created_At { get; set; }
}
