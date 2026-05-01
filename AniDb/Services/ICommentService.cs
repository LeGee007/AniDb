using AniDb.Models;

namespace AniDb.Services;

public interface ICommentService
{
    Task<List<Comment>> GetByAnimeIdAsync(int animeId);
    Task<Comment> AddAsync(Comment comment);
    Task<bool> DeleteAsync(int id);
}
