using DCRM.Common.Entities;

namespace DCRM.Common.Entity;

public partial class MedicineCategory:BaseEntity
{
    public new int Id { get; set; }

    public string? Medicine_Category { get; set; } = null!;
}
