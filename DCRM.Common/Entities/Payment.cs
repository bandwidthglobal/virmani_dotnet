using System;
using System.Collections.Generic;

namespace DCRM.Common.Entities;

public partial class Payment:BaseEntity
{
    public int Id { get; set; }

    public string Puid { get; set; } = null!;

    public int User_Id { get; set; }

    public string? Package_Id { get; set; }

    public string? Billing_Type { get; set; }

    public decimal? Amount { get; set; }

    public string Status { get; set; } = null!;

    public DateTime Created_At { get; set; }

    public DateTime? Expire_On { get; set; }

    public string? Payment_Method { get; set; }
}
