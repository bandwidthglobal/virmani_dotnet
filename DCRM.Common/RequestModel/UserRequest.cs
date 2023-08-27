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
        [StringLength(50, MinimumLength = 8,ErrorMessage = "Password should be minimum 8 characters and a maximum of 20 characters")]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
