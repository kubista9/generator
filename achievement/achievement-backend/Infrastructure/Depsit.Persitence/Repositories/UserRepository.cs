using System.Linq.Expressions;
using Depsit.Application.Common.Exceptions;
using Depsit.Application.Repositories;
using Depsit.Core.Domain.Entities;
using Depsit.Infrastructure.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Depsit.Infrastructure.Persistence.Repositories;

public class UserRepository<T> : IUserRepository<T> where T : class
{
    protected readonly DepsitDbContext _context;

    public UserRepository(DepsitDbContext context)
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

        if (typeof(T) == typeof(User))
        {
            var user = entity as User;
            var users = _context.Users.Where(u => u.Id == id);
            _context.Users.RemoveRange(users);
        }

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<EntityEntry<T>> GetByUserEmail(string email)
    {
        if (typeof(T) != typeof(User))
            throw new InvalidOperationException("This method is only for User entities");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            throw new NotFoundException("User with that email doesn't exist");
        }

        return _context.Entry((T)(object)user);
    }

    public async Task<T?> GetByIdAsync(Guid id)
    {
        return await _context.Set<T>().FindAsync(id);
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate)
    {
        return await _context.Set<T>().Where(predicate).ToListAsync();
    }
}
