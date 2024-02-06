using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface ITechnologicalProcedureRepository
    {
        Task<List<TechnologicalProcedure>> GetAllTechnologicalProcedures();

        Task<TechnologicalProcedure?> GetTechnologicalProcedureById(Guid id);

        Task<TechnologicalProcedure> AddTechnologicalProcedure(TechnologicalProcedure technologicalProcedure);

        Task<TechnologicalProcedure> UpdateTechnologicalProcedure(TechnologicalProcedure technologicalProcedure);

        Task<bool> DeleteTechnologicalProcedure(Guid id);
    }
}
