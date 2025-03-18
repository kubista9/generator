namespace Depsit.Application.Common;

public class DepsitPathEnums
{
    public static string Dummies(string id)
    {
        return $"/dummies/{id}";
    }
    public static (string, string) DummiesAssign(string id, List<string> users)
    {
        var path = $"/dummies/{id}/reassign";
        var query = "";

        foreach (var (user, i) in users.Select((value, i) => (value, i)))
        {
            query += $"{(i > 0 ? "&" : "")}users=" + user;
        }
        return (path, query);
    }
}
