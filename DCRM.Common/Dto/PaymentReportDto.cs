using Demo_Api.Models;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public partial class PaymentReportDto
{
    public long Id { get; set; }
    public string?  DoctorName { get; set; }
    public double Balance { get; set; }
    public List<Payment_Details_List>? PaymentDetailsList { get; set; }
    public double TotalAmount { get; set; }
    public double PaidAmount { get; set; }
    public string? ToothName { get; set; }
    public DateTime? WorkDoneDate { get; set; }
    public string? TreatementCode { get; set; }
    public string? NoteDiagnosis { get; set; }
    public string? PatientName { get; set; }
}
