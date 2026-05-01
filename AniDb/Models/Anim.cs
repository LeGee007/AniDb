namespace AniDb.Models;

public class Anim
{
    public int Id { get; set; }

    public int ExternalId { get; set; }

    public string Title { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal MalRating { get; set; }

    public decimal SiteRating { get; set; }

    public int SiteRatingCount { get; set; }

    public string ImageUrl { get; set; } = string.Empty;

    public DateTime? ReleaseDate { get; set; }

    public int DurationMinutes { get; set; }

    public string Studio { get; set; } = string.Empty;

    public int NumberOfEpisodes { get; set; }

    public string TrailerUrl { get; set; } = string.Empty;
}