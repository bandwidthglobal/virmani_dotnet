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

    public string Role { get; set; }

    [JsonIgnore] // refresh token is returned in http only cookie
    public string RefreshToken { get; set; }

    public AuthenticateResponse(string userName,string email,int id,string role, string jwtToken)
    {
        Id = id;
        UserName = userName;
        Email = email;
        Role = Role;
        JwtToken = jwtToken;
        RefreshToken = jwtToken;
    }
}