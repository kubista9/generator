namespace TokenHandler.Services;

public interface IExternalService<T>
{
	Task<string?> GetAsync(string endpoint);
}
