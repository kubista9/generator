using Microsoft.EntityFrameworkCore;
using Depsit.Infrastructure.Persistence.Context;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using Depsit.Domain.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Depsit.Infrastructure.Persistence.Repositories;

public class AchievementRepository<T> : IAchievementRepository<T> where T : class
{
    protected readonly DepsitDbContext _context;

    public AchievementRepository(DepsitDbContext context)
    {
        _context = context;
    }

    public async Task<EntityEntry<T>> AddAsync(T entity)
    {
        var entry = await _context.Set<T>().AddAsync(entity);
        return entry;
    }

    public async Task<EntityEntry<T>> UpdateAsync(T entity)
    {
        var entry = _context.Set<T>().Update(entity);
        await _context.SaveChangesAsync();
        return entry;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await _context.Set<T>().FindAsync(id);
        if (entity == null)
            return false;

        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize)
    {
        return await _context.Set<T>()
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAsync(string query)
    {
        return await _context.Set<T>()
            .Where(x => x.ToString()!.Contains(query))
            .ToListAsync();
    }

    public async Task<int> CountAsync()
    {
        return await _context.Set<T>().CountAsync();
    }

    public async Task<(IEnumerable<Achievement> Items, int TotalCount)> SearchAchievementsAsync(
        AchievementSearchParameters parameters)
    {
        if (typeof(T) != typeof(Achievement))
            throw new InvalidOperationException("This method is only for Achievement entities");

        var query = _context.Set<Achievement>().AsQueryable();

        if (!string.IsNullOrWhiteSpace(parameters.Title))
            query = query.Where(a => a.Title.Contains(parameters.Title));

        if (!string.IsNullOrWhiteSpace(parameters.Description))
            query = query.Where(a => a.Description.Contains(parameters.Description));

        if (!string.IsNullOrEmpty(parameters.Status))
            query = query.Where(a => a.Status == parameters.Status);

        if (parameters.FromDate.HasValue)
            query = query.Where(a => a.Reminder >= parameters.FromDate);

        if (parameters.ToDate.HasValue)
            query = query.Where(a => a.Reminder <= parameters.ToDate);

        var totalCount = await query.CountAsync();
        var items = await query
            .Skip((parameters.PageNumber - 1) * parameters.PageSize)
            .Take(parameters.PageSize)
            .Include(a => a.CreatedBy)
            .Include(a => a.AssignedTo)
            .ToListAsync();

        return (items, totalCount);
    }
}