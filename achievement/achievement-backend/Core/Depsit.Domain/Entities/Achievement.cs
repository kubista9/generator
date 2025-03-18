using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Depsit.Core.Domain.Entities;

public class Achievement
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public string Status { get; set; } = "";

    [ForeignKey("CreatedByUser")]
    public Guid CreatedBy { get; set; }

    [ForeignKey("AssignedToUser")]
    public Guid AssignedTo { get; set; }
    public DateTimeOffset Reminder { get; set; } = DateTimeOffset.Now;
}
