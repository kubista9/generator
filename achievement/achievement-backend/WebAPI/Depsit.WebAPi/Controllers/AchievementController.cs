using Depsit.Application.Features.AchievementFeatures;
using Depsit.Domain.Entities;
using Depsit.Presentation.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Depsit.Presentation.Controllers;

[Authorize(Policy = AuthorizationRoles.Admin)]
[ApiController]
[Route("api/achievements")]
public class AchievementController : BaseController
{
    private readonly IMediator _mediator;

    public AchievementController(IMediator mediator)
    {
        _mediator = mediator;
    }


    [HttpPost]
    public async Task<ActionResult<CreateAchievementResponse>> CreateAchievement(
        [FromBody] CreateAchievementFormRequest formRequest,
        CancellationToken cancellationToken)
    {
        var request = new CreateAchievementRequest(formRequest.Title, formRequest.Description, formRequest.Status, UserEmail(), formRequest.AssignedTo, formRequest.Reminder);
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<UpdateAchievementResponse>> UpdateAchievement(
    [FromRoute] Guid id,
    [FromBody] UpdateAchievementRequest request,
    CancellationToken cancellationToken)
    {
        try
        {
            if (id != request.Id)
            {
                return BadRequest("Route id and request id do not match");
            }

            var response = await _mediator.Send(request, cancellationToken);
            return Ok(response);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while processing your request");
        }
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<GetAchievementResponse>> GetAchievement(
        [FromRoute] Guid id,
        CancellationToken cancellationToken)
    {
        var request = new GetAchievementRequest(id);
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAchievement(
    [FromRoute] Guid id,
    CancellationToken cancellationToken)
    {
        var request = new DeleteAchievementRequest(id);
        await _mediator.Send(request, cancellationToken);
        return NoContent();
    }


    [HttpPatch()]
    public async Task<ActionResult<PatchAchievementResponse>> PatchAchievement(
    [FromRoute] Guid id,
    [FromBody] PatchAchievementRequest request,
    CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }


    [HttpGet("search")]
    [Produces("application/json")]
    public async Task<ActionResult<SearchAchievementsResponse>> SearchAchievements(
    [FromQuery] AchievementSearchParameters parameters,
    CancellationToken cancellationToken)
    {
        var request = new SearchAchievementsRequest(parameters);
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }


    [HttpGet]
    public async Task<ActionResult<GetAllAchievementsResponse>> GetAchievements(
        CancellationToken cancellationToken)
    {
        var request = new GetAllAchievementsRequest();
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }
}