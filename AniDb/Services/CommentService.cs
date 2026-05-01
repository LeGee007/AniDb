using AniDb.Data;
using AniDb.Models;
using Microsoft.EntityFrameworkCore;

namespace AniDb.Services;

public class CommentService : ICommentService
{
    private readonly AppDbContext _db;

    public CommentService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Comment>> GetByAnimeIdAsync(int animeId)
        => await _db.Comments
            .Where(c => c.AnimeId == animeId)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

    public async Task<Comment> AddAsync(Comment comment)
    {
        _db.Comments.Add(comment);
        await _db.SaveChangesAsync();
        return comment;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var comment = await _db.Comments.FindAsync(id);
        if (comment is null) return false;

        _db.Comments.Remove(comment);
        await _db.SaveChangesAsync();
        return true;
    }
}