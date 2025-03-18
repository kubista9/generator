namespace Depsit.Application.Common.Exceptions;

public class NotAuthorizedException : Exception
{
    public NotAuthorizedException(string message) : base(message)
    {
    }
}

