using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IPlantRepository
    {
        Task<List<Plant>> GetAllPlants();

        Task<Plant?> GetPlantById(Guid id);

        Task<Plant> AddPlant(Plant plant);

        Task<Plant> UpdatePlant(Plant plant);

        Task<bool> DeletePlant(Guid id);
    }
}
