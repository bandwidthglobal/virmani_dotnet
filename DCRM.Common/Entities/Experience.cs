using DCRM.Common.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entity;

public partial class Experience:BaseEntity
{
    public int User_Id { get; set; }

    [Required]
    public string Title { get; set; } = null!;

    [Required]
    public string Years { get; set; } = null!;

    public string Details { get; set; } = null!;
}
