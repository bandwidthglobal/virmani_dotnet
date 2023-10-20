
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Entities
{
    public partial class Userotp:BaseEntity
    {
        public int Id { get; set; }

        public string? PhoneNumber { get; set; } 

        public string? Otp { get; set; } 

        public DateTime CreatedDate { get; set; }

        public string? UserType { get; set; }

        public long? EntityId { get; set; }

        public DateTime? UpdatedDate { get; set; }

        public string? Email { get; set; } 
    }
}
