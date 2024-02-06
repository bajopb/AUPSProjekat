using AUPS_Backend.DTO;
using AUPS_Backend.Enums;
using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AUPS_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TechnologicalSystemController : ControllerBase
    {
        private readonly ITechnologicalSystemRepository _technologicalSystemRepository;
        private readonly IMapper _mapper;

        public TechnologicalSystemController(ITechnologicalSystemRepository technologicalSystemRepository, IMapper mapper)
        {
            _technologicalSystemRepository = technologicalSystemRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<TechnologicalSystemDTO>> GetTechnologicalSystems()
        {
            var technologicalSystems = await _technologicalSystemRepository.GetAllTechnologicalSystems();

            

            int totalCount = technologicalSystems.Count();
            

            if (!technologicalSystems.Any())
            {
                return NoContent();
            }

            var technologicalSystemsDto = _mapper.Map<List<TechnologicalSystemDTO>>(technologicalSystems);
            technologicalSystemsDto[0].TotalCount = totalCount;

            return Ok(technologicalSystemsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TechnologicalSystemDTO>> GetTechnologicalSystem(Guid id)
        {
            var technologicalSystem = await _technologicalSystemRepository.GetTechnologicalSystemById(id);

            if (technologicalSystem == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<TechnologicalSystemDTO>(technologicalSystem));
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<TechnologicalSystemDTO>> CreateTechnologicalSystem(TechnologicalSystemCreateDTO technologicalSystem)
        {
            var createdTechnologicalSystem = await _technologicalSystemRepository.AddTechnologicalSystem(_mapper.Map<TechnologicalSystem>(technologicalSystem));

            return CreatedAtAction("GetTechnologicalSystem", new { id = createdTechnologicalSystem.TechnologicalSystemId }, _mapper.Map<TechnologicalSystemDTO>(createdTechnologicalSystem));
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<TechnologicalSystemDTO>> UpdateTechnologicalSystem(TechnologicalSystemUpdateDTO technologicalSystem)
        {
            var matchingTechnologicalSystem = await _technologicalSystemRepository.GetTechnologicalSystemById(technologicalSystem.TechnologicalSystemId);
            if (matchingTechnologicalSystem == null)
            {
                return NotFound();
            }

            var updatedTechnologicalSystem = await _technologicalSystemRepository.UpdateTechnologicalSystem(_mapper.Map<TechnologicalSystem>(technologicalSystem));

            return Ok(_mapper.Map<TechnologicalSystemDTO>(updatedTechnologicalSystem));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<IActionResult> DeleteTechnologicalSystem(Guid id)
        {
            bool isDeleted = await _technologicalSystemRepository.DeleteTechnologicalSystem(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
