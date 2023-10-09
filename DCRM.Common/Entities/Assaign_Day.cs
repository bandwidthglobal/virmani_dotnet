using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public  class Assaign_Day:BaseEntity
{
    public int Id { get; set; }

    public int User_Id { get; set; }

    public int Day { get; set; }

    public string? Start { get; set; }

    public string? End { get; set; }
}
