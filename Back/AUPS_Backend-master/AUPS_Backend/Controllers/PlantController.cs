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
    public class PlantController : ControllerBase
    {
        private readonly IPlantRepository _plantRepository;
        private readonly IMapper _mapper;

        public PlantController(IPlantRepository plantRepository, IMapper mapper)
        {
            _plantRepository = plantRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PlantDTO>> GetPlants()
        {
            var plants = await _plantRepository.GetAllPlants();
            

            int totalCount = plants.Count();
           

            if (!plants.Any())
            {
                return NoContent();
            }

            var plantsDto = _mapper.Map<List<PlantDTO>>(plants);
            plantsDto[0].TotalCount = totalCount;

            return Ok(plantsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlantDTO>> GetPlant(Guid id)
        {
            var plant = await _plantRepository.GetPlantById(id);

            if (plant == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PlantDTO>(plant));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<PlantDTO>> CreatePlant(PlantCreateDTO plant)
        {
            var createdPlant = await _plantRepository.AddPlant(_mapper.Map<Plant>(plant));

            return CreatedAtAction("GetPlant", new { id = createdPlant.PlantId }, _mapper.Map<PlantDTO>(createdPlant));
        }

        [HttpPut]
        [Authorize(Roles = "Admin")]

        public async Task<ActionResult<PlantDTO>> UpdatePlant(PlantUpdateDTO plant)
        {
            var matchingPlant = await _plantRepository.GetPlantById(plant.PlantId);
            if (matchingPlant == null)
            {
                return NotFound();
            }

            var updatedPlant = await _plantRepository.UpdatePlant(_mapper.Map<Plant>(plant));

            return Ok(_mapper.Map<PlantDTO>(updatedPlant));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]

        public async Task<IActionResult> DeletePlant(Guid id)
        {
            bool isDeleted = await _plantRepository.DeletePlant(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
