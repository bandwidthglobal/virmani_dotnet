using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace DCRM.Common.RequestModel
{
    public class WorkdoneRequest
    {
        public int Id { get; set; }

        public long Treatment_Id { get; set; }

        public int Doctor_Id { get; set; }

        public double Estimated_Amount { get; set; }

        public double Current_Work_Amt { get; set; }

        public double Discount { get; set; }

        public double Total_Amt { get; set; }

        public int Workdone_Status { get; set; }
        public int ToothNotation { get; set; }
        public int TeethName { get; set; }
        public bool IsMilkTeeth { get; set; }
        public DateTime Created_At { get; set; }

        public DateTime Updated_At { get; set; }
    }
}
