using AUPS_Backend.DTO;
using AUPS_Backend.Enums;
using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AUPS_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationalUnitController : ControllerBase
    {
        private readonly IOrganizationalUnitRepository _organizationalUnitRepository;
        private readonly IMapper _mapper;

        public OrganizationalUnitController(IOrganizationalUnitRepository organizationalUnitRepository, IMapper mapper)
        {
            _organizationalUnitRepository = organizationalUnitRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<OrganizationalUnitDTO>> GetOrganiaztionalUnits()
        {
            var organizationalUnits = await _organizationalUnitRepository.GetAllOrganizationalUnits();

            
            int totalCount = organizationalUnits.Count();
            

            if (!organizationalUnits.Any())
            {
                return NoContent();
            }

            var organizationalUnitsDto = _mapper.Map<List<OrganizationalUnitDTO>>(organizationalUnits);
            organizationalUnitsDto[0].TotalCount = totalCount;

            return Ok(organizationalUnitsDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrganizationalUnitDTO>> GetOrganizationalUnit(Guid id)
        {
            var organizationalUnit = await _organizationalUnitRepository.GetOrganizationalUnitById(id);

            if (organizationalUnit == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<OrganizationalUnitDTO>(organizationalUnit));
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<OrganizationalUnitDTO>> CreateOrganizationalUnit(OrganizationalUnitCreateDTO organizationalUnit)
        {
            var createdOrganizationalUnit = await _organizationalUnitRepository.AddOrganizationalUnit(_mapper.Map<OrganizationalUnit>(organizationalUnit));

            return CreatedAtAction("GetOrganizationalUnit", new { id = createdOrganizationalUnit.OrganizationalUnitId }, _mapper.Map<OrganizationalUnitDTO>(createdOrganizationalUnit));
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<OrganizationalUnitDTO>> UpdateOrganizationalUnit(OrganizationalUnitUpdateDTO organizationalUnit)
        {
            var matchingOrganizationalUnit = await _organizationalUnitRepository.GetOrganizationalUnitById(organizationalUnit.OrganizationalUnitId);
            if (matchingOrganizationalUnit == null)
            {
                return NotFound();
            }

            var updatedOrganizationalUnit = await _organizationalUnitRepository.UpdateOrganizationalUnit(_mapper.Map<OrganizationalUnit>(organizationalUnit));

            return Ok(_mapper.Map<OrganizationalUnitDTO>(updatedOrganizationalUnit));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<IActionResult> DeleteOrganizationalUnit(Guid id)
        {
            bool isDeleted = await _organizationalUnitRepository.DeleteOrganizationalUnit(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
