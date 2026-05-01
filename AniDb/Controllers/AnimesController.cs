using AniDb.Services;
using Microsoft.AspNetCore.Mvc;

namespace AniDb.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnimesController : ControllerBase
{
    private readonly IAnimeService _service;

    public AnimesController(IAnimeService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var anime = await _service.GetByIdAsync(id);
        if (anime is null) return NotFound();
        return Ok(anime);
    }

    [HttpGet("top")]
    public async Task<IActionResult> GetTop()
        => Ok(await _service.GetTopAsync());

    [HttpGet("latest")]
    public async Task<IActionResult> GetLatest( )
        => Ok(await _service.GetLatestAsync());

    [HttpGet("search")]
    public async Task<IActionResult> Search([FromQuery] string query)
        => Ok(await _service.SearchAsync(query));

    [HttpPost("{id}/rate")]
    public async Task<IActionResult> Rate(int id, [FromBody] decimal score)
    {
        if (score < 1 || score > 10) return BadRequest("Score must be between 1 and 10");
        var anime = await _service.RateAsync(id, score);
        if (anime is null) return NotFound();
        return Ok(anime);
    }
}
