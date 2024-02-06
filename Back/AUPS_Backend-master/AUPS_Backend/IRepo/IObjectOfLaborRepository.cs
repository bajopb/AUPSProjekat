using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IObjectOfLaborRepository
    {
        Task<List<ObjectOfLabor>> GetAllObjectOfLabors();

        Task<ObjectOfLabor?> GetObjectOfLaborById(Guid id);

        Task<ObjectOfLabor> AddObjectOfLabor(ObjectOfLabor objectOfLabor);

        Task<ObjectOfLabor> UpdateObjectOfLabor(ObjectOfLabor objectOfLabor);

        Task<bool> DeleteObjectOfLabor(Guid id);
    }
}
