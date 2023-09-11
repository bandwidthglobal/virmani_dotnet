using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DCRM.Common.Authorization
{
    public class AuthosizationResponse
    {
        public AuthosizationResponse() { }

        public int Id { get; set; }

        public int Email { get; set; }

        public int Role { get; set; }
       
    }
}
