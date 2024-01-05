namespace DCRM.Common.Entities;

public partial class Diagonosis:BaseEntity
{
    
   
    public long? User_Id { get; set; }

    public string? Name { get; set; }

    public string? Details { get; set; }
}
