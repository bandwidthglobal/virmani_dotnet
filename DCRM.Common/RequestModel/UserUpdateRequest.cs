using System.ComponentModel.DataAnnotations;

namespace DCRM.Api.Models
{
    public class UserUpdateRequest
    {
       
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        [DataType(DataType.PhoneNumber)]
        [StringLength(10, MinimumLength = 10,ErrorMessage = "phone number should be 10 characters")]
        [Phone]
        public string PhoneNumber { get; set; }
        
        public string City { get; set; }

        public string Specialist { get; set; }

        public string Degree { get; set; }

        public string AboutMe { get; set; }

        public int ExperienceYears { get; set; }

    }
}
