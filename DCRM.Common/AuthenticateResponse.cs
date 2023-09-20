namespace DCRM.Common;

using DCRM.Common.Dto;
using DCRM.Common.Entity;
using System.Text.Json.Serialization;

public class AuthenticateResponse
{
    public int Id { get; set; }
    public string Email { get; set; }
    public string JwtToken { get; set; }
    public string Name { get; set; }

    public string Thumb { get; set; }
    public string Role { get; set; }

    [JsonIgnore] // refresh token is returned in http only cookie
    public string RefreshToken { get; set; }

    public AuthenticateResponse(string email, int id, string role, string jwtToken, string name, string thumb)
    {
        Id = id;
        Email = email;
        Name = name;
        Role = role;
        JwtToken = jwtToken;
        RefreshToken = jwtToken;
        Thumb = thumb;
    }
}