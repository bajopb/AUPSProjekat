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
    public class ProductionPlanController : ControllerBase
    {
        private readonly IProductionPlanRepository _productionPlanRepository;
        private readonly IMapper _mapper;

        public ProductionPlanController(IProductionPlanRepository productionPlanRepository, IMapper mapper)
        {
            _productionPlanRepository = productionPlanRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<ProductionPlanDTO>> GetProductionPlans()
        {
            var productionPlans = await _productionPlanRepository.GetAllProductionPlans();

           

            int totalCount = productionPlans.Count();
          

            if (!productionPlans.Any())
            {
                return NoContent();
            }

            var productionPlansDto = _mapper.Map<List<ProductionPlanDTO>>(productionPlans);
            productionPlansDto[0].TotalCount = totalCount;

            return Ok(productionPlansDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductionPlanDTO>> GetProductionPlan(Guid id)
        {
            var productionPlan = await _productionPlanRepository.GetProductionPlanById(id);

            if (productionPlan == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProductionPlanDTO>(productionPlan));
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<ProductionPlanDTO>> CreateProductionPlan(ProductionPlanCreateDTO productionPlan)
        {
            var createdProductionPlan = await _productionPlanRepository.AddProductionPlan(_mapper.Map<ProductionPlan>(productionPlan));

            return CreatedAtAction("GetProductionPlan", new { id = createdProductionPlan.ProductionPlanId }, _mapper.Map<ProductionPlanDTO>(createdProductionPlan));
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<ProductionPlanDTO>> UpdateProductionPlan(ProductionPlanUpdateDTO productionPlan)
        {
            var matchingProductionPlan = await _productionPlanRepository.GetProductionPlanById(productionPlan.ProductionPlanId);
            if (matchingProductionPlan == null)
            {
                return NotFound();
            }

            var updatedProductionPlan = await _productionPlanRepository.UpdateProductionPlan(_mapper.Map<ProductionPlan>(productionPlan));

            return Ok(_mapper.Map<ProductionPlanDTO>(updatedProductionPlan));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<IActionResult> DeleteProductionPlan(Guid id)
        {
            bool isDeleted = await _productionPlanRepository.DeleteProductionPlan(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
