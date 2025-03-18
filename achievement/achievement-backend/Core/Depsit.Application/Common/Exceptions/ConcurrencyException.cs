namespace Depsit.Application.Common.Exceptions;

public class ConcurrencyException : Exception
{
    public ConcurrencyException(string message) : base(message) => Errors = new string[] { message};

    public ConcurrencyException(string[] errors) : base("Multiple errors occurred. See error details.")
    {
        Errors = errors;
    }

    public string[] Errors { get; set; }
}
