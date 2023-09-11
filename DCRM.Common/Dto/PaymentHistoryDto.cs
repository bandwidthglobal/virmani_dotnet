using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public partial class PaymentHistoryDto
{
    public long Id { get; set; }

    public long DoctorId { get; set; }

    public long PatientId { get; set; }

    public long WorkdoneId { get; set; }

    public string?  DoctorName { get; set; }

    public string? ToothCode { get; set; }

    public string? Date { get; set; }

    public string Description { get; set; } = null!;

    public double CreditAmount { get; set; }

    public double DebitAmount { get; set; }

    public sbyte AmountType { get; set; }

    public double Balance { get; set; }

    public string PaymentMode { get; set; } = null!;

    public double RemainingEstimate { get; set; }
    
    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
