using AUPS_Backend.Models;

namespace AUPS_Backend.IRepo
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllEmployees();

        Task<Employee?> GetEmployeeById(Guid id);

        Task<Employee?> GetEmployeeByEmail(string email);

        Task<Employee> AddEmployee(Employee employee);

        Task<Employee> UpdateEmployee(Employee employee);

        Task<bool> DeleteEmployee(Guid id);
    }
}
