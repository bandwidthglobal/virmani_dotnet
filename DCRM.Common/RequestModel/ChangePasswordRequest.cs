namespace DCRM.Common.Request
{
    public class ChangePasswordRequest
    {
        public int Id { get; set; }
        
        public string? OldPassword { get; set; } = string.Empty;

        public string? NewPassword { get; set; } = string.Empty;

        public string? ConfirmPassword { get; set; } = string.Empty;

        public string? Type { get; set; } = string.Empty;
    }
}
