using AniDb.Models;
using Microsoft.EntityFrameworkCore;

namespace AniDb.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Anim> Animes { get; set; }
    public DbSet<Comment> Comments { get; set; }
}