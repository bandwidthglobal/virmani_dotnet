using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Entities
{
    public partial class MasterType : BaseEntity
    {
        public new int Id { get; set; }

        public string Name { get; set; } = null!;
    }
}
