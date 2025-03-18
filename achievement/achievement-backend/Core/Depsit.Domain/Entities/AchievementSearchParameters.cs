﻿namespace Depsit.Domain.Entities;

public class AchievementSearchParameters
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public Guid CreatedBy { get; set; }
    public Guid AssignedTo { get; set; }
    public DateTimeOffset? FromDate { get; set; }
    public DateTimeOffset? ToDate { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}