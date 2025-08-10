using DCRM.Common.Entities;

namespace DCRM.Common.Entity;

public partial class Tooth:BaseEntity
{
    public new int Id { get; set; }

    public int TeethCat { get; set; }

    public string TeethNumber { get; set; } = null!;

    public string Image { get; set; } = null!;

    public string TeethNote { get; set; } = null!;
}
