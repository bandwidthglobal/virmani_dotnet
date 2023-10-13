using DCRM.Common.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Dto
{
    public class PrescriptionDto
    {
        public int Id { get; set; }

        public long Chamber_Id { get; set; }
       
        public long User_Id { get; set; }
       
        public long Patient_Id { get; set; }
       
        public string Drug_Id { get; set; } = null!;

        public string Next_Duration { get; set; } = null!;

        public string Next_Time { get; set; } = null!;

        public int? Check_Report { get; set; }

        public string? Feedback { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? MrNumber { get; set; }

        public string? Age { get; set; }

        public string? Address { get; set; }

        public string? Name { get; set; }
        public DateTime Created_At { get; set; }
        public List<DrugDto> DrugDtoList { get; set; }
        public List<Drug> Drugs { get; set; }

        public Chamber Chamber { get; set; }
        public string? Weight { get; set; }
    }
}
