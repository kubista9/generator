using Depsit.Application.Repositories;
using Depsit.Infrastructure.Persistence.Context;

namespace Depsit.Persistence.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly DepsitDbContext _context;

    public UnitOfWork(DepsitDbContext context)
    {
        _context = context;
    }
    public Task Save(CancellationToken cancellationToken)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}

