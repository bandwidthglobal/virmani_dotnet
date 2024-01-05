using DCRM.Common.Entities;

namespace DCRM.Common.Entity;

public partial class TeethCategory:BaseEntity
{
    public new int Id { get; set; }

    public string Teeth_Category_Name { get; set; } = null!;
}
