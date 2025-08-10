namespace DCRM.Common.Entities
{
    public partial class Userotp:BaseEntity
    {
        public new int Id { get; set; }

        public string? PhoneNumber { get; set; } 

        public string? Otp { get; set; } 

        public DateTime CreatedDate { get; set; }

        public string? UserType { get; set; }

        public long? EntityId { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public string? Email { get; set; } 
    }
}
