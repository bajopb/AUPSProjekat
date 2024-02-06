using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IObjectOfLaborTechnologicalProcedureRepository
    {
        Task<List<ObjectOfLaborTechnologicalProcedure>> GetAllObjectOfLaborTechnologicalProcedures();

        Task<List<ObjectOfLaborTechnologicalProcedure>> GetObjectOfLaborTechnologicalProceduresByObjectOfLaborId(Guid objectOfLaborId);

        Task<ObjectOfLaborTechnologicalProcedure?> GetObjectOfLaborTechnologicalProcedureById(Guid id);

        Task<ObjectOfLaborTechnologicalProcedure> AddObjectOfLaborTechnologicalProcedure(ObjectOfLaborTechnologicalProcedure objectOfLaborTechnologicalProcedure);

        Task<ObjectOfLaborTechnologicalProcedure> UpdateObjectOfLaborTechnologicalProcedure(ObjectOfLaborTechnologicalProcedure objectOfLaborTechnologicalProcedure);

        Task<bool> DeleteObjectOfLaborTechnologicalProcedure(Guid id);
    }
}
