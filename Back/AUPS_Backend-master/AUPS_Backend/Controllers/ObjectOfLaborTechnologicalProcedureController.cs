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
    public class ObjectOfLaborTechnologicalProcedureController : ControllerBase
    {
        private readonly IObjectOfLaborTechnologicalProcedureRepository _objectOfLaborTechnologicalProcedureRepository;
        private readonly ITechnologicalSystemRepository _technologicalSystemRepository;
        private readonly IPlantRepository _plantRepository;
        private readonly IOrganizationalUnitRepository _organizationalUnitRepository;
        private readonly IMapper _mapper;

        public ObjectOfLaborTechnologicalProcedureController(IObjectOfLaborTechnologicalProcedureRepository objectOfLaborTechnologicalProcedureRepository, ITechnologicalSystemRepository technologicalSystemRepository, IPlantRepository plantRepository, IOrganizationalUnitRepository organizationalUnitRepository, IMapper mapper)
        {
            _objectOfLaborTechnologicalProcedureRepository = objectOfLaborTechnologicalProcedureRepository;
            _technologicalSystemRepository = technologicalSystemRepository;
            _plantRepository = plantRepository;
            _organizationalUnitRepository = organizationalUnitRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ObjectOfLaborTechnologicalProcedureDTO>> GetObjectOfLaborTechnologicalProcedures( Guid? objectOfLaborId)
        {
            var objectOfLaborTechnologicalProcedures = await _objectOfLaborTechnologicalProcedureRepository.GetAllObjectOfLaborTechnologicalProcedures();
            if (objectOfLaborId != null)
            {
                objectOfLaborTechnologicalProcedures = objectOfLaborTechnologicalProcedures.Where(temp => temp.ObjectOfLaborId == objectOfLaborId).ToList();
            }

            

            int totalCount = objectOfLaborTechnologicalProcedures.Count();
            

            if (!objectOfLaborTechnologicalProcedures.Any())
            {
                return NoContent();
            }

            var objectOfLaborTechnologicalProceduresDto = _mapper.Map<List<ObjectOfLaborTechnologicalProcedureDTO>>(objectOfLaborTechnologicalProcedures);
            objectOfLaborTechnologicalProceduresDto[0].TotalCount = totalCount;

            return Ok(objectOfLaborTechnologicalProceduresDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectOfLaborTechnologicalProcedureDTO>> GetObjectOfLaborTechnologicalProcedure(Guid id)
        {
            var objectOfLaborTechnologicalProcedure = await _objectOfLaborTechnologicalProcedureRepository.GetObjectOfLaborTechnologicalProcedureById(id);

            if (objectOfLaborTechnologicalProcedure == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ObjectOfLaborTechnologicalProcedureDTO>(objectOfLaborTechnologicalProcedure));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<ObjectOfLaborTechnologicalProcedureDTO>> CreateObjectOfLaborTechnologicalProcedure(ObjectOfLaborTechnologicalProcedureCreateDTO objectOfLaborTechnologicalProcedure)
        {
            var createdObjectOfLaborTechnologicalProcedure = await _objectOfLaborTechnologicalProcedureRepository.AddObjectOfLaborTechnologicalProcedure(_mapper.Map<ObjectOfLaborTechnologicalProcedure>(objectOfLaborTechnologicalProcedure));

            return CreatedAtAction("GetObjectOfLaborTechnologicalProcedure", new { id = createdObjectOfLaborTechnologicalProcedure.ObjectOfLaborTechnologicalProcedureId }, _mapper.Map<ObjectOfLaborTechnologicalProcedureDTO>(createdObjectOfLaborTechnologicalProcedure));
        }


        [HttpPut]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<ObjectOfLaborTechnologicalProcedureDTO>> UpdateObjectOfLaborTechnologicalProcedure(ObjectOfLaborTechnologicalProcedureUpdateDTO objectOfLaborTechnologicalProcedure)
        {
            var matchingObjectOfLaborTechnologicalProcedure = await _objectOfLaborTechnologicalProcedureRepository.GetObjectOfLaborTechnologicalProcedureById(objectOfLaborTechnologicalProcedure.ObjectOfLaborTechnologicalProcedureId);
            if (matchingObjectOfLaborTechnologicalProcedure == null)
            {
                return NotFound();
            }

            var updatedObjectOfLaborTechnologicalProcedure = await _objectOfLaborTechnologicalProcedureRepository.UpdateObjectOfLaborTechnologicalProcedure(_mapper.Map<ObjectOfLaborTechnologicalProcedure>(objectOfLaborTechnologicalProcedure));

            return Ok(_mapper.Map<ObjectOfLaborTechnologicalProcedureDTO>(updatedObjectOfLaborTechnologicalProcedure));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteObjectOfLaborTechnologicalProcedure(Guid id)
        {
            bool isDeleted = await _objectOfLaborTechnologicalProcedureRepository.DeleteObjectOfLaborTechnologicalProcedure(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
