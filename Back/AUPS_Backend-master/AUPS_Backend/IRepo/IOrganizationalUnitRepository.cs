using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IOrganizationalUnitRepository
    {
        Task<List<OrganizationalUnit>> GetAllOrganizationalUnits();

        Task<OrganizationalUnit?> GetOrganizationalUnitById(Guid id);

        Task<OrganizationalUnit> AddOrganizationalUnit(OrganizationalUnit organizationalUnit);

        Task<OrganizationalUnit> UpdateOrganizationalUnit(OrganizationalUnit organizationalUnit);

        Task<bool> DeleteOrganizationalUnit(Guid id);
    }
}
