namespace DCRM.Common;

using DCRM.Common.Dto;
using DCRM.Common.Entity;
using System.Text.Json.Serialization;

public class AuthenticateResponse
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string JwtToken { get; set; }

    [JsonIgnore] // refresh token is returned in http only cookie
    public string RefreshToken { get; set; }

    public AuthenticateResponse(User user, string jwtToken)
    {
        Id = user.Id;
        UserName = user.User_Name;
        Email = user.Email;
        JwtToken = jwtToken;
        RefreshToken = jwtToken;
    }
}