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
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseRepository _warehouseRepository;
        private readonly IMapper _mapper;

        public WarehouseController(IWarehouseRepository warehouseRepository, IMapper mapper)
        {
            _warehouseRepository = warehouseRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<WarehouseDTO>> GetWarehouses()
        {
            var warehouses = await _warehouseRepository.GetAllWarehouses();

            

            int totalCount = warehouses.Count();
           

            if (!warehouses.Any())
            {
                return NoContent();
            }

            var warehousesDto = _mapper.Map<List<WarehouseDTO>>(warehouses);
            warehousesDto[0].TotalCount = totalCount;

            return Ok(warehousesDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WarehouseDTO>> GetWarehouse(Guid id)
        {
            var warehouse = await _warehouseRepository.GetWarehouseById(id);

            if (warehouse == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<WarehouseDTO>(warehouse));
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<WarehouseDTO>> CreateWarehouse(WarehouseCreateDTO warehouse)
        {
            var createdWarehouse = await _warehouseRepository.AddWarehouse(_mapper.Map<Warehouse>(warehouse));

            return CreatedAtAction("GetWarehouse", new { id = createdWarehouse.WarehouseId }, _mapper.Map<WarehouseDTO>(createdWarehouse));
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<WarehouseDTO>> Updatewarehouse(WarehouseUpdateDTO warehouse)
        {
            var matchingWarehouse = await _warehouseRepository.GetWarehouseById(warehouse.WarehouseId);
            if (matchingWarehouse == null)
            {
                return NotFound();
            }

            var updatedWarehouse = await _warehouseRepository.UpdateWarehouse(_mapper.Map<Warehouse>(warehouse));

            return Ok(_mapper.Map<WarehouseDTO>(updatedWarehouse));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<IActionResult> Deletewarehouse(Guid id)
        {
            bool isDeleted = await _warehouseRepository.DeleteWarehouse(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
