using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface ITechnologicalSystemRepository
    {
        Task<List<TechnologicalSystem>> GetAllTechnologicalSystems();

        Task<TechnologicalSystem?> GetTechnologicalSystemById(Guid id);

        Task<TechnologicalSystem> AddTechnologicalSystem(TechnologicalSystem technologicalSystem);

        Task<TechnologicalSystem> UpdateTechnologicalSystem(TechnologicalSystem technologicalSystem);

        Task<bool> DeleteTechnologicalSystem(Guid id);
    }
}
