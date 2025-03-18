namespace Depsit.Application.Features.AchievementFeatures;

public class GetAchievementResponse
{
    public Guid Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid AssignedTo { get; set; }
    public DateTimeOffset Reminder {  get; set; }
}