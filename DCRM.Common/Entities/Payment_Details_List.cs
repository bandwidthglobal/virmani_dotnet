using DCRM.Common.Entities;

namespace Demo_Api.Models;

public partial class Payment_Details_List:BaseEntity
{
    public new long Id { get; set; }

    public long Payment_History_Id { get; set; }

    public long Price { get; set; }

    public string Payment_Type { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime Created_At { get; set; }

    public DateTime Updated_At { get; set; }
}
