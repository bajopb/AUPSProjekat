using AUPS_Backend.DTO;
using AUPS_Backend.Enums;
using AUPS_Backend.Identity;
using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AUPS_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductionOrderController : ControllerBase
    {
        private readonly IProductionOrderRepository _productionOrderRepository;
        private readonly IObjectOfLaborTechnologicalProcedureRepository _objectOfLaborTechnologicalProcedureRepository;
        private readonly IObjectOfLaborMaterialRepository _objectOfLaborMaterialRepository;
        private readonly IMaterialRepository _materialRepository;
        private readonly IObjectOfLaborRepository _objectOfLaborRepository;
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public ProductionOrderController(IProductionOrderRepository productionOrderRepository, IObjectOfLaborTechnologicalProcedureRepository objectOfLaborTechnologicalProcedureRepository, IObjectOfLaborMaterialRepository objectOfLaborMaterialRepository, IMaterialRepository materialRepository, IObjectOfLaborRepository objectOfLaborRepository, IEmployeeRepository employeeRepository, IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _productionOrderRepository = productionOrderRepository;
            _objectOfLaborTechnologicalProcedureRepository = objectOfLaborTechnologicalProcedureRepository;
            _objectOfLaborMaterialRepository = objectOfLaborMaterialRepository;
            _materialRepository = materialRepository;
            _objectOfLaborRepository = objectOfLaborRepository;
            _employeeRepository = employeeRepository;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<ProductionOrderDTO>> GetProductionOrders()
        {
            var productionOrders = await _productionOrderRepository.GetAllProductionOrders();
            
            

            int totalCount = productionOrders.Count();
            

            if (!productionOrders.Any())
            {
                return NoContent();
            }

            var productionOrdersDto = _mapper.Map<List<ProductionOrderDTO>>(productionOrders);
            foreach(var productionOrderDto in productionOrdersDto)
            {
                var objectOfLaborTechnologicalProcedures = await _objectOfLaborTechnologicalProcedureRepository.GetObjectOfLaborTechnologicalProceduresByObjectOfLaborId(productionOrderDto.ObjectOfLaborId);
                if (objectOfLaborTechnologicalProcedures.Any())
                {
                    if (productionOrderDto.CurrentTechnologicalProcedureExecuted)
                    {
                        productionOrderDto.CurrentState = (((productionOrderDto.CurrentTechnologicalProcedure - 1) * 1.0) / objectOfLaborTechnologicalProcedures.Count) * 100;
                    }
                    else
                    {
                        productionOrderDto.CurrentState = (productionOrderDto.CurrentTechnologicalProcedure / (double)objectOfLaborTechnologicalProcedures.Count) * 100;
                    }
                }
                else
                {
                    productionOrderDto.CurrentState = 0;
                }
            }
            productionOrdersDto[0].TotalCount = totalCount;

            return Ok(productionOrdersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductionOrderDTO>> GetProductionOrder(Guid id)
        {
            var productionOrder = await _productionOrderRepository.GetProductionOrderById(id);

            if (productionOrder == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProductionOrderDTO>(productionOrder));
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<ProductionOrderDTO>> CreateProductionOrder(ProductionOrderCreateDTO productionOrder)
        {
            var newProductionOrder = _mapper.Map<ProductionOrder>(productionOrder);
            newProductionOrder.CurrentTechnologicalProcedure = 0;
            newProductionOrder.CurrentTechnologicalProcedureExecuted = false;
            var currentUser = await _userManager.GetUserAsync(User);
            var manager = await _employeeRepository.GetEmployeeByEmail(currentUser.Email);
            if (manager != null)
            {
                newProductionOrder.EmployeeId = manager.EmployeeId;
            }
            var createdProductionOrder = await _productionOrderRepository.AddProductionOrder(newProductionOrder);

            return CreatedAtAction("GetProductionOrder", new { id = createdProductionOrder.ProductionOrderId }, _mapper.Map<ProductionOrderDTO>(createdProductionOrder));
        }

        [HttpPut]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<ProductionOrderDTO>> UpdateProductionOrder(ProductionOrderUpdateDTO productionOrder)
        { 
            var matchingProductionOrder = await _productionOrderRepository.GetProductionOrderById(productionOrder.ProductionOrderId);
            if (matchingProductionOrder == null)
            {
                return NotFound();
            }

            var currentUser = await _userManager.GetUserAsync(User);
            var manager = await _employeeRepository.GetEmployeeById(matchingProductionOrder.EmployeeId);
            if (manager == null || currentUser.Email != manager.Email)
            {
                return Unauthorized();
            }

            var editedProductionOrder = _mapper.Map<ProductionOrder>(productionOrder);
            editedProductionOrder.EmployeeId = manager.EmployeeId;
            var updatedProductionOrder = await _productionOrderRepository.UpdateProductionOrder(editedProductionOrder);

            return Ok(_mapper.Map<ProductionOrderDTO>(updatedProductionOrder));
        }

        [HttpPut("startNextTechnologicalProcedure")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<ProductionOrderDTO>> StartNextTechnologicalProcedure(ProductionOrderDTO productionOrder)
        {
            var matchingProductionOrder = await _productionOrderRepository.GetProductionOrderById(productionOrder.ProductionOrderId);
            if (matchingProductionOrder == null)
            {
                return NotFound();
            }

            if (matchingProductionOrder.CurrentTechnologicalProcedure == 0)
            {
                var necessaryMaterials = await _objectOfLaborMaterialRepository.GetObjectOfLaborMaterialsByObjectOfLaborId(matchingProductionOrder.ObjectOfLaborId);
                foreach (var necessaryMaterial in necessaryMaterials)
                {
                    if (necessaryMaterial.Quantity > necessaryMaterial.Material.StockQuantity)
                    {
                        return BadRequest("Nema dovoljno materijala na zalihama.");
                    }
                }

                foreach (var necessaryMaterial in necessaryMaterials)
                {
                    var material = necessaryMaterial.Material;
                    material.StockQuantity = material.StockQuantity - necessaryMaterial.Quantity;
                    await _materialRepository.UpdateMaterial(material);
                }
            }

            var objectOfLaborTechnologicalProcedures = await _objectOfLaborTechnologicalProcedureRepository.GetObjectOfLaborTechnologicalProceduresByObjectOfLaborId(matchingProductionOrder.ObjectOfLaborId);
            if (objectOfLaborTechnologicalProcedures.Any() && matchingProductionOrder.CurrentTechnologicalProcedure < objectOfLaborTechnologicalProcedures.Count)
            {
                matchingProductionOrder.CurrentTechnologicalProcedure++;
                matchingProductionOrder.CurrentTechnologicalProcedureExecuted = true;
            }

            var updatedProductionOrder = await _productionOrderRepository.UpdateProductionOrder(matchingProductionOrder);

            return Ok(_mapper.Map<ProductionOrderDTO>(updatedProductionOrder));
        }

        [HttpPut("finishCurrentTechnologicalProcedure")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<ActionResult<ProductionOrderDTO>> FinishCurrentTechnologicalProcedure(ProductionOrderDTO productionOrder)
        {
            var matchingProductionOrder = await _productionOrderRepository.GetProductionOrderById(productionOrder.ProductionOrderId);
            if (matchingProductionOrder == null)
            {
                return NotFound();
            }

            var objectOfLaborTechnologicalProcedures = await _objectOfLaborTechnologicalProcedureRepository.GetObjectOfLaborTechnologicalProceduresByObjectOfLaborId(matchingProductionOrder.ObjectOfLaborId);
            if (matchingProductionOrder.CurrentTechnologicalProcedure == objectOfLaborTechnologicalProcedures.Count)
            {
                var objectOfLabor = matchingProductionOrder.ObjectOfLabor;
                objectOfLabor.StockQuantity += matchingProductionOrder.Quantity;
                await _objectOfLaborRepository.UpdateObjectOfLabor(objectOfLabor);
            }

            matchingProductionOrder.CurrentTechnologicalProcedureExecuted = false;
            var updatedProductionOrder = await _productionOrderRepository.UpdateProductionOrder(matchingProductionOrder);

            return Ok(_mapper.Map<ProductionOrderDTO>(updatedProductionOrder));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Menadzer")]

        public async Task<IActionResult> DeleteProductionOrder(Guid id)
        {
            var productionOrder = await _productionOrderRepository.GetProductionOrderById(id);
            if (productionOrder == null)
            {
                return NotFound();
            }

            var manager = await _employeeRepository.GetEmployeeById(productionOrder.EmployeeId);
            var currentUser = await _userManager.GetUserAsync(User);
            if (manager == null || currentUser.Email != manager.Email)
            {
                return Unauthorized();
            }

            await _productionOrderRepository.DeleteProductionOrder(id);

            return NoContent();
        }
    }
}
