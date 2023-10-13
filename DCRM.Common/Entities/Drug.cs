using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public  class Drug
{
    public int Id { get; set; }

    //[Required]
    public long User_Id { get; set; }

    //[Required]
    public string? Medicine_Name { get; set; }
    //[Required]
    public string Medicine_Type { get; set; } 
    //[Required]
    public string Medicine_Brand_Id { get; set; } 
    //[Required]
    public string Medicine_Category_Id { get; set; } 

    public string? Medicine_Image { get; set; }
    //[Required]
    public string? Medicine_Company { get; set; }
    //[Required]
    public string Basic_Salt { get; set; } 

  
    public string? Medicine_Composition { get; set; }

    public string? Medicine_Group { get; set; }

    public string? Unit { get; set; }

    public string? Min_Level { get; set; }

    public string? Reorder_Level { get; set; }

    public string? Vat { get; set; }

    public string? Unit_Packing { get; set; }

    public string? Supplier { get; set; }

    public string? Vat_Ac { get; set; }

    public string? Note { get; set; }

    public string Form { get; set; } 

    public string Description { get; set; } 

    public string Safety_Alerts { get; set; } 

    public string Bactrology { get; set; } 
    //[Required]
    public string Dosage { get; set; } 
    ///[Required]
    public string Details { get; set; } 
    //[Required]
    public string Dose_No { get; set; } 

    public int Status { get; set; }

    
    public sbyte Is_Delete { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
