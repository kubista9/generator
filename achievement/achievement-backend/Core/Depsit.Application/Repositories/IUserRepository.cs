using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Depsit.Application.Repositories;

public interface IUserRepository<T> where T : class
{
    Task<EntityEntry<T>> AddAsync(T entity);
    Task<EntityEntry<T>> UpdateAsync(T entity);
    Task<EntityEntry<T>> GetByUserEmail(string email);
    Task<bool> DeleteAsync(Guid id);
    Task<T?> GetByIdAsync(Guid id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
}