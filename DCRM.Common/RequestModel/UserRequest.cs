using System.ComponentModel.DataAnnotations;

namespace DCRM.Common.RequestModel
{
    public class UserRequest
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public bool IsTermsandConditions { get; set; }
    }
}
