using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IProductionOrderRepository
    {
        Task<List<ProductionOrder>> GetAllProductionOrders();

        Task<ProductionOrder?> GetProductionOrderById(Guid id);

        Task<ProductionOrder> AddProductionOrder(ProductionOrder productionOrder);

        Task<ProductionOrder> UpdateProductionOrder(ProductionOrder productionOrder);

        Task<bool> DeleteProductionOrder(Guid id);
    }
}
