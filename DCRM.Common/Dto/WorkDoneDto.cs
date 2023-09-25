using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Dto
{
    public class WorkDoneDto
    {
        public int Id { get; set; }

        public long Treatment_Id { get; set; }

        public int Doctor_Id { get; set; }

        public double EstimatedAmount { get; set; }

        public double CurrentWorkAmt { get; set; }

        public double Discount { get; set; }

        public double TotalAmt { get; set; }

        public string? WorkdoneStatus { get; set; }

        public string? DoctorName { get; set; } 

        public string? ToothName { get; set; }

        public string? TreatmentCode { get; set; }

        public string? Notesdiagnosis { get; set; }

        public string AmtDueCurrentWork { get; set; } = null!;

        public DateTime Created_At { get; set; }

        public DateTime Updated_At { get; set; }

        public string Date { get; set; }
    }
}
