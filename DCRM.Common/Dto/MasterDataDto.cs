using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Dto
{
    public class MasterDataDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Basic_Salt { get; set; } = null!;

        public string? Company_Name { get; set; } = null!;
        public int? TypeId { get; set; }
        public string MasterType { get; set; }
        public int? ParentId { get; set; }
        public DateTime Created_At { get; set; }
        public DateTime Updated_At { get; set; }
    }
}
