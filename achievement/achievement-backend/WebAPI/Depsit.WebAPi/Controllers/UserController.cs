using Depsit.Application.Features.UserFeatures;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Depsit.Presentation.Common;

namespace Depsit.Presentation.Controllers;

[Authorize(Policy = AuthorizationRoles.Admin)]
[ApiController]
[Route("api/users")]
public class UserController : BaseController
{
    private readonly IMediator _mediator;
    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<ActionResult<CreateUserResponse>> CreateUser(
        [FromBody] CreateUserRequest request,
        CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<UpdateUserResponse>> UpdateUser(
        [FromBody] UpdateUserRequest request,
        CancellationToken cancellationToken)
    {
        var response = await _mediator.Send(request, cancellationToken);
        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetUserResponse>> GetUser(
      [FromRoute] Guid id,
      CancellationToken cancellationToken)
    {
        try
        {
            var request = new GetUserRequest(id);
            var response = await _mediator.Send(request, cancellationToken);

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }
        catch (FormatException)
        {
            return BadRequest("Invalid GUID format");
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

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(
    [FromRoute] Guid id,
    CancellationToken cancellationToken)
    {
        try
        {
            var request = new DeleteUserRequest(id);
            await _mediator.Send(request, cancellationToken);
            return NoContent();
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

    [HttpPatch("{id}")]
    public async Task<ActionResult<PatchUserResponse>> PatchUser(
    [FromRoute] Guid id,
    [FromBody] PatchUserRequest request,
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
}