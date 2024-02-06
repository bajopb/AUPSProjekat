using AUPS_Backend.DTO;
using AUPS_Backend.Enums;
using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AUPS_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjectOfLaborMaterialController : ControllerBase
    {
        private readonly IObjectOfLaborMaterialRepository _objectOfLaborMaterialRepository;
        private readonly IMapper _mapper;

        public ObjectOfLaborMaterialController(IObjectOfLaborMaterialRepository objectOfLaborMaterialRepository, IMapper mapper)
        {
            _objectOfLaborMaterialRepository = objectOfLaborMaterialRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ObjectOfLaborMaterialDTO>> GetObjectOfLaborMaterials()
        {
            var objectOfLaborMaterials = await _objectOfLaborMaterialRepository.GetAllObjectOfLaborMaterials();
            

            int totalCount = objectOfLaborMaterials.Count();
            

            if (!objectOfLaborMaterials.Any())
            {
                return NoContent();
            }

            var objectOfLaborMaterialsDto = _mapper.Map<List<ObjectOfLaborMaterialDTO>>(objectOfLaborMaterials);
            objectOfLaborMaterialsDto[0].TotalCount = totalCount;

            return Ok(objectOfLaborMaterialsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ObjectOfLaborMaterialDTO>> GetObjectOfLaborMaterial(Guid id)
        {
            var objectOfLaborMaterial = await _objectOfLaborMaterialRepository.GetObjectOfLaborMaterialById(id);

            if (objectOfLaborMaterial == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ObjectOfLaborMaterialDTO>(objectOfLaborMaterial));
        }

        [HttpPost]
        public async Task<ActionResult<ObjectOfLaborMaterialDTO>> CreateObjectOfLaborMaterial(ObjectOfLaborMaterialCreateDTO objectOfLaborMaterial)
        {
            var createdObjectOfLaborMaterial = await _objectOfLaborMaterialRepository.AddObjectOfLaborMaterial(_mapper.Map<ObjectOfLaborMaterial>(objectOfLaborMaterial));

            return CreatedAtAction("GetObjectOfLaborMaterial", new { id = createdObjectOfLaborMaterial.ObjectOfLaborMaterialId }, _mapper.Map<ObjectOfLaborMaterialDTO>(createdObjectOfLaborMaterial));
        }

        [HttpPut]
        public async Task<ActionResult<ObjectOfLaborMaterialDTO>> UpdateObjectOfLaborMaterial(ObjectOfLaborMaterialUpdateDTO objectOfLaborMaterial)
        {
            var matchingObjectOfLaborMaterial = await _objectOfLaborMaterialRepository.GetObjectOfLaborMaterialById(objectOfLaborMaterial.ObjectOfLaborMaterialId);
            if (matchingObjectOfLaborMaterial == null)
            {
                return NotFound();
            }

            var updatedObjectOfLaborMaterial = await _objectOfLaborMaterialRepository.UpdateObjectOfLaborMaterial(_mapper.Map<ObjectOfLaborMaterial>(objectOfLaborMaterial));

            return Ok(_mapper.Map<ObjectOfLaborMaterialDTO>(updatedObjectOfLaborMaterial));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObjectOfLaborMaterial(Guid id)
        {
            bool isDeleted = await _objectOfLaborMaterialRepository.DeleteObjectOfLaborMaterial(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
