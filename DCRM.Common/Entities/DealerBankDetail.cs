namespace DCRM.Common.Entity;

public partial class DealerBankDetail
{
    public long Id { get; set; }

    public long Dealer_Id { get; set; }

    public string? Bank_Name { get; set; }

    public long? Bank_Account_Number { get; set; }

    public string? Ifsc_Code { get; set; }

    public string? Remarks { get; set; }

    public DateTime Updated_At { get; set; }
}
