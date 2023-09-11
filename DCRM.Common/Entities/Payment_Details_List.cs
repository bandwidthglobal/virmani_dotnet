using DCRM.Common.Entities;
using System;
using System.Collections.Generic;

namespace Demo_Api.Models;

public partial class Payment_Details_List:BaseEntity
{
    public long Id { get; set; }

    public long Payment_History_Id { get; set; }

    public long Price { get; set; }

    public string Payment_Type { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
