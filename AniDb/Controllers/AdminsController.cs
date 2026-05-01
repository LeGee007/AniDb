using AniDb.Models;
using AniDb.Services;
using Microsoft.AspNetCore.Mvc;

namespace AniDb.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminsController : ControllerBase
{
    private readonly IAdminService _service;

    public AdminsController(IAdminService service)
    {
        _service = service;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(Anim anime)
    {
        var created = await _service.CreateAsync(anime);
        return CreatedAtAction(nameof(Create), new { id = created.Id }, created);
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(int id, Anim updated)
    {
        var anime = await _service.UpdateAsync(id, updated);
        if (anime is null) return NotFound();
        return Ok(anime);
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
