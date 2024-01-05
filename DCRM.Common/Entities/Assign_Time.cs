using DCRM.Common.Entities;

namespace DCRM.Common.Entity;

public  class Assign_Time : BaseEntity
{
    public new int Id { get; set; }

    public int User_Id { get; set; }

    public int Day_Id { get; set; }

    public string Time { get; set; } = null!;

    public string Start { get; set; } = null!;

    public string End { get; set; } = null!;
}
