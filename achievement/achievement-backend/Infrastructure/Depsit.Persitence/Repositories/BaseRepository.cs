using Microsoft.EntityFrameworkCore;
using Depsit.Infrastructure.Persistence.Context;
using System.Linq.Expressions;
using Depsit.Application.Repositories;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Security.Principal;

namespace Depsit.Infrastructure.Persistence.Repositories;

public class BaseRepository<T> : IRepository<T> where T : class
{
    protected readonly DepsitDbContext _context;

    public BaseRepository(DepsitDbContext context)
    {
        _context = context;
    }

    public EntityEntry<T> Attach(T entity)
    {
        return _context.Attach(entity);
    }

    public EntityEntry<T> Create(T entity)
    {
        return _context.Add(entity);
    }

    public void Update(T entity)
    {
        _context.Update(entity);
    }

    public void Delete(T entity)
    {
        _context.Remove(entity);
    }

    public EntityEntry<T> Entry(T entity)
    {
        return _context.Entry(entity);
    }

    public async Task<T?> Get(Guid id, CancellationToken cancellationToken)
    {
        return await _context.Set<T>().FindAsync(new object[] { id }, cancellationToken);
    }

    public async Task<List<T>> GetAll(CancellationToken cancellationToken)
    {
        return await _context.Set<T>().ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _context.Set<T>().Where(predicate).ToListAsync();
    }

    public void RemoveRange(IEnumerable<T> entities)
    {
        _context.RemoveRange(entities);
    }
}