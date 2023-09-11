using System;
using System.Collections.Generic;

namespace DCRM.Common.Entities;

public partial class Payment_User:BaseEntity
{
    public int Id { get; set; }

    public string Puid { get; set; } = null!;

    public int UserId { get; set; }

    public int Patient_Id { get; set; }

    public int Appointment_Id { get; set; }

    public decimal? Amount { get; set; }

    public string Status { get; set; } = null!;

    public DateTime Created_At { get; set; }

    public string? Payment_Method { get; set; }
}
