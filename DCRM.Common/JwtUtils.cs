
using DCRM.Common;
using DCRM.Common.Dto;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DCRM.Common.Entity;

public interface IJwtUtils
{
    public string GenerateJwtToken1(User user);

    public string GenerateJwtToken(int id,string? email,string? role,string? userName);
    public ResponceValidateJwtToken ValidateJwtToken(string token);
    public RefreshToken GenerateRefreshToken(string ipAddress);
}

public class JwtUtils : IJwtUtils
{
    //private DataContext _context;
    private readonly AppSettings _appSettings;

    public JwtUtils(
       // DataContext context,
        IOptions<AppSettings> appSettings)
    {
        //_context = context;
        _appSettings = appSettings.Value;
    }


    public string GenerateJwtToken1(User user)
    {
        // generate token that is valid for 15 minutes
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_appSettings.Secret);

        var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt64(_appSettings.Expires)),
            SigningCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    public string GenerateJwtToken(int id, string email, string role,string userName)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_appSettings.Secret);
        var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { 
                new Claim("id", id.ToString()), 
                new Claim("email", email),
                new Claim("role", role),
            }),
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt64(_appSettings.Expires)),
            SigningCredentials = new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public ResponceValidateJwtToken ValidateJwtToken(string token)
    {
        if (token == null)
            return null;

        ResponceValidateJwtToken responceValidateJwtToken = new ResponceValidateJwtToken();

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_appSettings.Secret);
        try
        {
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var role = jwtToken.Payload.Claims.Skip(2).FirstOrDefault().Value;


            var id = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
            responceValidateJwtToken.Role = role;
            responceValidateJwtToken.Id = id;
            // return user id from JWT token if validation successful
            return responceValidateJwtToken;
        }
        catch
        {
            // return null if validation fails
            return null;
        }
    }

    public RefreshToken GenerateRefreshToken(string ipAddress)
    {
        var refreshToken = new RefreshToken
        {
            Token = getUniqueToken(),
            // token is valid for 7 days
            Expires = DateTime.UtcNow.AddDays(7),
            Created = DateTime.UtcNow,
            CreatedByIp = ipAddress
        };

        return refreshToken;

        string getUniqueToken()
        {
            // token is a cryptographically strong random sequence of values
            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            // ensure token is unique by checking against db
            //var tokenIsUnique = !_context.Users.Any(u => u.RefreshTokens.Any(t => t.Token == token));

            //if (!tokenIsUnique)
            //    return getUniqueToken();
            
            return token;
        }
    }
}