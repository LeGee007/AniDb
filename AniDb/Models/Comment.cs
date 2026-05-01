namespace AniDb.Models;

public class Comment
{
    public int Id { get; set; }
    public int AnimeId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}