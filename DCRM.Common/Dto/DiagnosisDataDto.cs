using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Dto;

public partial class DiagnosisDataDto
{

    public int Id { get; set; }
    public string Category { get; set; } 

    public int Parent { get; set; }

    public string Work_Reference { get; set; } 

    public string Code { get; set; } 

    public DateTime Date { get; set; }

    public string Amount { get; set; } 

    public List<DiagnosisDataDto> Children { get; set; }
}
