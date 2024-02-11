using AUPS_Backend.DTO;
using AUPS_Backend.Enums;
using AUPS_Backend.Identity;
using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AUPS_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkplaceController : ControllerBase
    {
        private readonly IWorkplaceRepository _workplaceRepository;
        private readonly IMapper _mapper;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public WorkplaceController(IWorkplaceRepository workplaceRepository, IMapper mapper, RoleManager<ApplicationRole> roleManager)
        {
            _workplaceRepository = workplaceRepository;
            _mapper = mapper;
            _roleManager = roleManager;
        }

        [HttpGet]
        public async Task<ActionResult<WorkplaceDTO>> GetWorkplaces()
        {
            var workplaces = await _workplaceRepository.GetAllWorkplaces();

           

            int totalCount = workplaces.Count();
            

            if (!workplaces.Any())
            {
                return NoContent();
            }

            var workplacesDto = _mapper.Map<List<WorkplaceDTO>>(workplaces);
            workplacesDto[0].TotalCount = totalCount;

            return Ok(workplacesDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkplaceDTO>> GetWorkplace(Guid id)
        {
            var workplace = await _workplaceRepository.GetWorkplaceById(id);

            if (workplace == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<WorkplaceDTO>(workplace));
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<WorkplaceDTO>> CreateWorkplace(WorkplaceCreateDTO workplace)
        {
            var createdWorkplace = await _workplaceRepository.AddWorkplace(_mapper.Map<Workplace>(workplace));

            if (await _roleManager.FindByNameAsync(createdWorkplace.WorkplaceName) is null)
            {
                ApplicationRole role = new ApplicationRole()
                {
                    Name = createdWorkplace.WorkplaceName
                };
                await _roleManager.CreateAsync(role);
            }

            return CreatedAtAction("GetWorkplace", new {id = createdWorkplace.WorkplaceId}, _mapper.Map<WorkplaceDTO>(createdWorkplace));
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<WorkplaceDTO>> UpdateWorkplace(WorkplaceUpdateDTO workpalce)
        {
            var matchingWorkplace = await _workplaceRepository.GetWorkplaceById(workpalce.WorkplaceId);
            if (matchingWorkplace == null)
            {
                return NotFound();
            }

            Workplace oldWorkplace = new Workplace()
            {
                WorkplaceId = matchingWorkplace.WorkplaceId,
                WorkplaceName = matchingWorkplace.WorkplaceName
            };

            var updatedWorkplace = await _workplaceRepository.UpdateWorkplace(_mapper.Map<Workplace>(workpalce));

            

            return Ok(_mapper.Map<WorkplaceDTO>(updatedWorkplace));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<IActionResult> DeleteWorkplace(Guid id)
        {
            var workplace = await _workplaceRepository.GetWorkplaceById(id);
            if (workplace == null)
            {
                return NotFound();
            }

            
            await _workplaceRepository.DeleteWorkplace(id);

            return NoContent();
        }
    }
}
