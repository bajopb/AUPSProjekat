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
    public class ObjectOfLaborController : ControllerBase
    {
        private readonly IObjectOfLaborRepository _objectOfLaborRepository;
        private readonly IMapper _mapper;

        public ObjectOfLaborController(IObjectOfLaborRepository objectOfLaborRepository, IMapper mapper)
        {
            _objectOfLaborRepository = objectOfLaborRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ObjectOfLaborDTO>> GetObjectOfLabors()
        {
            var objectOfLabors = await _objectOfLaborRepository.GetAllObjectOfLabors();

            

            int totalCount = objectOfLabors.Count();
            

            if (!objectOfLabors.Any())
            {
                return NoContent();
            }

            var objectOfLaborsDto = _mapper.Map<List<ObjectOfLaborDTO>>(objectOfLabors);
            objectOfLaborsDto[0].TotalCount = totalCount;

            return Ok(objectOfLaborsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectOfLaborDTO>> GetObjectOfLabor(Guid id)
        {
            var objectOfLabor = await _objectOfLaborRepository.GetObjectOfLaborById(id);

            if (objectOfLabor == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ObjectOfLaborDTO>(objectOfLabor));
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<ObjectOfLaborDTO>> CreateObjectOfLabor(ObjectOfLaborCreateDTO objectOfLabor)
        {
            var createdObjectOfLabor = await _objectOfLaborRepository.AddObjectOfLabor(_mapper.Map<ObjectOfLabor>(objectOfLabor));

            return CreatedAtAction("GetObjectOfLabor", new { id = createdObjectOfLabor.ObjectOfLaborId }, _mapper.Map<ObjectOfLaborDTO>(createdObjectOfLabor));
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<ObjectOfLaborDTO>> UpdateObjectOfLabor(ObjectOfLaborUpdateDTO objectOfLabor)
        {
            var matchingObjectOfLabor = await _objectOfLaborRepository.GetObjectOfLaborById(objectOfLabor.ObjectOfLaborId);
            if (matchingObjectOfLabor == null)
            {
                return NotFound();
            }

            var updatedObjectOfLabor = await _objectOfLaborRepository.UpdateObjectOfLabor(_mapper.Map<ObjectOfLabor>(objectOfLabor));

            return Ok(_mapper.Map<ObjectOfLaborDTO>(updatedObjectOfLabor));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteObjectOfLabor(Guid id)
        {
            bool isDeleted = await _objectOfLaborRepository.DeleteObjectOfLabor(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
