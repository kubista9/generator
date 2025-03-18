using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq.Expressions;

namespace Depsit.Application.Repositories;
public interface IRepository<T> where T : class
{
    public EntityEntry<T> Attach(T entity);
    public EntityEntry<T> Create(T entity);
    public void Update(T entity);
    public void RemoveRange(IEnumerable<T> children);
    public void Delete(T entity);
    public EntityEntry<T> Entry(T entity);
    public Task<T?> Get(Guid id, CancellationToken cancellationToken);
    public Task<List<T>> GetAll(CancellationToken cancellationToken);
    Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate);
}