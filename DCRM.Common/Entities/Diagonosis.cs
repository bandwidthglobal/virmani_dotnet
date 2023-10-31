using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.Entities;

public partial class Diagonosis:BaseEntity
{
    

    public int User_Id { get; set; }

    public string? Name { get; set; }

    public string? Details { get; set; }
}
