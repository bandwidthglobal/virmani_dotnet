using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Entities
{
    public class ForgotPassword
    {
        [Required]
        public long EntityId { get; set; }

        //[Required]
        //[DataType(DataType.PhoneNumber)]
        //[StringLength(10, MinimumLength = 10, ErrorMessage = "phone number should be 10 digit")]
        //public string PhoneNumber { get; set; }


        [Required]
        [DataType(DataType.Password)]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Password should be minimum 8 characters and a maximum of 20 characters")]
        public string NewPassword { get; set; }

        //[Required]
        //[DataType(DataType.Password)]
        //[Compare("NewPassword")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;
    }
}
