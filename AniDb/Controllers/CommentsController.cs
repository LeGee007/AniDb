using AniDb.Models;
using AniDb.Services;
using Microsoft.AspNetCore.Mvc;

namespace AniDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommentsController : ControllerBase
{
    private readonly ICommentService _service;

    public CommentsController(ICommentService service)
    {
        _service = service;
    }

    [HttpGet("{animeId}")]
    public async Task<IActionResult> GetByAnimeId(int animeId)
        => Ok(await _service.GetByAnimeIdAsync(animeId));

    [HttpPost]
    public async Task<IActionResult> Add(Comment comment)
    {
        comment.CreatedAt = DateTime.UtcNow;
        var created = await _service.AddAsync(comment);
        return CreatedAtAction(nameof(GetByAnimeId), new { animeId = created.AnimeId }, created);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
