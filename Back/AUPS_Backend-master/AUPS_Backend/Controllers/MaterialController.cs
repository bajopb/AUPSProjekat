using AUPS_Backend.DTO;
using AUPS_Backend.Enums;
using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AUPS_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialRepository _materialRepository;
        private readonly IMapper _mapper;

        public MaterialController(IMaterialRepository materialRepository, IMapper mapper)
        {
            _materialRepository = materialRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<MaterialDTO>> GetMaterials()
        {
            var materials = await _materialRepository.GetAllMaterials();

           

            int totalCount = materials.Count();
            

            if (!materials.Any())
            {
                return NoContent();
            }

            var materialsDto = _mapper.Map<List<MaterialDTO>>(materials);
            materialsDto[0].TotalCount = totalCount;

            return Ok(materialsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaterialDTO>> GetMaterial(Guid id)
        {
            var material = await _materialRepository.GetMaterialById(id);

            if (material == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<MaterialDTO>(material));
        }

        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult<MaterialDTO>> CreateMaterial(MaterialCreateDTO Material)
        {
            var createdMaterial = await _materialRepository.AddMaterial(_mapper.Map<Material>(Material));

            return CreatedAtAction("GetMaterial", new { id = createdMaterial.MaterialId }, _mapper.Map<MaterialDTO>(createdMaterial));
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<MaterialDTO>> UpdateMaterial(MaterialUpdateDTO material)
        {
            var matchingMaterial = await _materialRepository.GetMaterialById(material.MaterialId);
            if (matchingMaterial == null)
            {
                return NotFound();
            }

            var updatedMaterial = await _materialRepository.UpdateMaterial(_mapper.Map<Material>(material));

            return Ok(_mapper.Map<MaterialDTO>(updatedMaterial));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeleteMaterial(Guid id)
        {
            bool isDeleted = await _materialRepository.DeleteMaterial(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
