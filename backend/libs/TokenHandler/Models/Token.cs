using System.Text.Json.Serialization;

namespace TokenHandler.Models;

public record Token
{
    public static Token Empty => new Token { Scheme = string.Empty, AccessToken = string.Empty };

    [JsonPropertyName("token_type")]
    public string Scheme { get; set; } = default!;

    [JsonPropertyName("access_token")]
    public string AccessToken { get; set; } = default!;

    [JsonPropertyName("expires_in")]
    public double ExpiresIn { get; set; } = default!;
    public DateTime ExpirationTime { get; set; }    //=> DateTime.UtcNow.AddSeconds(ExpiresIn);

    [JsonPropertyName("refresh_token")]
    public string RefreshToken { get; set; } = default!;
}