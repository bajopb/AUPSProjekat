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
    public class TechnologicalProcedureController : ControllerBase
    {
        private readonly ITechnologicalProcedureRepository _technologicalProcedureRepository;
        private readonly IMapper _mapper;

        public TechnologicalProcedureController(ITechnologicalProcedureRepository technologicalProcedureRepository, IMapper mapper)
        {
            _technologicalProcedureRepository = technologicalProcedureRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<TechnologicalProcedureDTO>> GetTechnologicalProcedures()
        {
            var technologicalProcedures = await _technologicalProcedureRepository.GetAllTechnologicalProcedures();


            int totalCount = technologicalProcedures.Count();
           

            if (!technologicalProcedures.Any())
            {
                return NoContent();
            }

            var technologicalProceduresDto = _mapper.Map<List<TechnologicalProcedureDTO>>(technologicalProcedures);
            technologicalProceduresDto[0].TotalCount = totalCount;

            return Ok(technologicalProceduresDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TechnologicalProcedureDTO>> GetTechnologicalProcedure(Guid id)
        {
            var technologicalProcedure = await _technologicalProcedureRepository.GetTechnologicalProcedureById(id);

            if (technologicalProcedure == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<TechnologicalProcedureDTO>(technologicalProcedure));
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<TechnologicalProcedureDTO>> CreateTechnologicalProcedure(TechnologicalProcedureCreateDTO technologicalProcedure)
        {
            var createdTechnologicalProcedure = await _technologicalProcedureRepository.AddTechnologicalProcedure(_mapper.Map<TechnologicalProcedure>(technologicalProcedure));

            return CreatedAtAction("GetTechnologicalProcedure", new { id = createdTechnologicalProcedure.TechnologicalProcedureId }, _mapper.Map<TechnologicalProcedureDTO>(createdTechnologicalProcedure));
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<TechnologicalProcedureDTO>> UpdateTechnologicalProcedure(TechnologicalProcedureUpdateDTO technologicalProcedure)
        {
            var matchingTechnologicalProcedure = await _technologicalProcedureRepository.GetTechnologicalProcedureById(technologicalProcedure.TechnologicalProcedureId);
            if (matchingTechnologicalProcedure == null)
            {
                return NotFound();
            }

            var updatedTechnologicalProcedure = await _technologicalProcedureRepository.UpdateTechnologicalProcedure(_mapper.Map<TechnologicalProcedure>(technologicalProcedure));

            return Ok(_mapper.Map<TechnologicalProcedureDTO>(updatedTechnologicalProcedure));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<IActionResult> DeleteTechnologicalProcedure(Guid id)
        {
            bool isDeleted = await _technologicalProcedureRepository.DeleteTechnologicalProcedure(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
