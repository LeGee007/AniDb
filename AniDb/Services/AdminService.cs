using AniDb.Data;
using Microsoft.EntityFrameworkCore;
using AniDb.Models;

namespace AniDb.Services;

public class AdminService : IAdminService
{
    private readonly AppDbContext _db;

    public AdminService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<Anim> CreateAsync(Anim anime)
    {
        _db.Animes.Add(anime);
        await _db.SaveChangesAsync();
        return anime;
    }

    public async Task<Anim> UpdateAsync(int id, Anim updated)
    {
        var anime = await _db.Animes.FindAsync(id);
        if (anime is null) return null;

        anime.ExternalId = updated.ExternalId;
        anime.Title = updated.Title;
        anime.Genre = updated.Genre;
        anime.Description = updated.Description;
        anime.MalRating = updated.MalRating;
        anime.ImageUrl = updated.ImageUrl;
        anime.ReleaseDate = updated.ReleaseDate;
        anime.DurationMinutes = updated.DurationMinutes;
        anime.Studio = updated.Studio;
        anime.NumberOfEpisodes = updated.NumberOfEpisodes;
        anime.TrailerUrl = updated.TrailerUrl;

        await _db.SaveChangesAsync();
        return anime;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var anime = await _db.Animes.FindAsync(id);
        if (anime is null) return false;

        _db.Animes.Remove(anime);
        await _db.SaveChangesAsync();
        return true;
    }
}