using DCRM.Common.Entities;

namespace DCRM.Common.Entity;

public partial class MedicineBrand:BaseEntity
{
    public new int Id { get; set; }

    public string? Medicine_Brand { get; set; } = null!;

    public string? Basic_Salt { get; set; } = null!;

    public string? Company_Name { get; set; } = null!;
}
