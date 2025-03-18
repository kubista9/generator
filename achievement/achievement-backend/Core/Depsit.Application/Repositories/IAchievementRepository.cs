using Depsit.Core.Domain.Entities;
using Depsit.Domain.Entities;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Depsit.Application.Repositories;

public interface IAchievementRepository<T> where T : class
{
    Task<EntityEntry<T>> AddAsync(T entity);
    Task<EntityEntry<T>> UpdateAsync(T entity);
    Task<bool> DeleteAsync(Guid id);
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize);
    Task<IEnumerable<T>> FindAsync(string querry);
    Task<int> CountAsync();
    Task<(IEnumerable<Achievement> Items, int TotalCount)> SearchAchievementsAsync(
        AchievementSearchParameters parameters);
}