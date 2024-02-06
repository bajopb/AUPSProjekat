using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IWarehouseRepository
    {
        Task<List<Warehouse>> GetAllWarehouses();

        Task<Warehouse?> GetWarehouseById(Guid id);

        Task<Warehouse> AddWarehouse(Warehouse warehouse);

        Task<Warehouse> UpdateWarehouse(Warehouse warehouse);

        Task<bool> DeleteWarehouse(Guid id);
    }
}
