using AniDb.Models;

namespace AniDb.Services;

public interface IAdminService
{
    Task<Anim> CreateAsync(Anim anime);
    Task<Anim?> UpdateAsync(int id, Anim updated);
    Task<bool> DeleteAsync(int id);

}
