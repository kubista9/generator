using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Depsit.Core.Domain.Entities;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string Name { get; set; } = "";
    public string Role { get; set; } = "";
    public string Email { get; set; } = "";
    [JsonIgnore]
    public List<Achievement> CreatedAchievements { get; set; } = new();
    [JsonIgnore]
    public List<Achievement> AssignedAchievements { get; set; } = new();
}