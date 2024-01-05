using DCRM.Common.Entities;

namespace DCRM.Common.Entity;

public  class Assaign_Day:BaseEntity
{
    public new int Id { get; set; }

    public int User_Id { get; set; }

    public int Day { get; set; }

    public string? Start { get; set; }

    public string? End { get; set; }
}
