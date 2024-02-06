using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IMaterialRepository
    {
        Task<List<Material>> GetAllMaterials();

        Task<Material?> GetMaterialById(Guid id);

        Task<Material> AddMaterial(Material material);

        Task<Material> UpdateMaterial(Material material);

        Task<bool> DeleteMaterial(Guid id);
    }
}
