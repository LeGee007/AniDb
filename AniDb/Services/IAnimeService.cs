using AniDb.Models;

namespace AniDb.Services;

public interface IAnimeService
{
    Task<List<Anim>> GetAllAsync();
    Task<Anim?> GetByIdAsync(int id);
    Task<List<Anim>> GetTopAsync();
    Task<List<Anim>> GetLatestAsync();
    Task<List<Anim>> SearchAsync(string query);
    Task<Anim?> RateAsync(int id, decimal score);
}
