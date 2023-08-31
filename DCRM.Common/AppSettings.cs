namespace DCRM.Common;

public class AppSettings
{
    public string Secret { get; set; }
    public string Expires { get; set; }
    public int RefreshTokenTTL { get; set; }
}