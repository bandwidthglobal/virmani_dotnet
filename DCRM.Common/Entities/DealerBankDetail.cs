using System;
using System.Collections.Generic;

namespace DCRM.Common.Entity;

public partial class DealerBankDetail
{
    public long Id { get; set; }

    public long Dealer_Id { get; set; }

    public string Bank_Name { get; set; } = null!;

    public long Bank_Account_Number { get; set; }

    public string Ifsc_Code { get; set; } = null!;

    public string? Remarks { get; set; }

    public DateTime Updated_At { get; set; }
}
