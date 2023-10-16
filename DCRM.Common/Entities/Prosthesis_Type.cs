using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entities;

public  class Prosthesis_Type:BaseEntity
{

    [Required]
    public string Name { get; set; } = null!;
}
