using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Dto
{
    public class ReferBy
    {
        public long PatientId { get; set; }
        public string? RefferedBy { get; set; }
        public string? Name { get; set; }
        public string? RelationshipType { get; set; }
    }
}
