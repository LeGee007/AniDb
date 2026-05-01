using AniDb.Data;
using AniDb.Models;
using Microsoft.EntityFrameworkCore;

namespace AniDb.Services;

public class AnimeService : IAnimeService
{
    private readonly AppDbContext _db;

    public AnimeService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Anim>> GetAllAsync()
        => await _db.Animes.ToListAsync();

    public async Task<Anim?> GetByIdAsync(int id)
        => await _db.Animes.FindAsync(id);

    public async Task<List<Anim>> GetTopAsync()
        => await _db.Animes
            .OrderByDescending(a => a.MalRating)
            .Take(10)
            .ToListAsync();

    public async Task<List<Anim>> GetLatestAsync()
        => await _db.Animes
        .OrderByDescending(a => a.ReleaseDate)
        .Take(10)
        .ToListAsync();

    public async Task<List<Anim>> SearchAsync(string query)
        => await _db.Animes
            .Where(a => a.Title.Contains(query) ||
                        a.Genre.Contains(query) ||
                        a.Studio.Contains(query))
            .ToListAsync();

    public async Task<Anim?> RateAsync(int id, decimal score)
    {
        var anime = await _db.Animes.FindAsync(id);
        if (anime is null) return null;
        anime.SiteRating = ((anime.SiteRating * anime.SiteRatingCount) + score) / (anime.SiteRatingCount + 1);
        anime.SiteRatingCount++;
        await _db.SaveChangesAsync();
        return anime;
    }
}