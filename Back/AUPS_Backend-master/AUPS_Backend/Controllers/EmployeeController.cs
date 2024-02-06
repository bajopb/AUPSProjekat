using AUPS_Backend.DTO;
using AUPS_Backend.Enums;
using AUPS_Backend.Identity;
using AUPS_Backend.IRepo;
using AUPS_Backend.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AUPS_Backend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IWorkplaceRepository _workplaceRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public EmployeeController(IEmployeeRepository employeeRepository, IWorkplaceRepository workplaceRepository, IMapper mapper, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            _employeeRepository = employeeRepository;
            _workplaceRepository = workplaceRepository;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        [HttpGet]
        public async Task<ActionResult<EmployeeDTO>> GetEmployees()
        {
            var employees = await _employeeRepository.GetAllEmployees();

            

            int totalCount = employees.Count();
           

            var employeesDto = _mapper.Map<List<EmployeeDTO>>(employees);
            employeesDto[0].TotalCount = totalCount;

            return Ok(employeesDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeeDTO>> GetEmployee(Guid id)
        {
            var employee = await _employeeRepository.GetEmployeeById(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<EmployeeDTO>(employee));
        }

        [HttpPost]
        public async Task<ActionResult<EmployeeDTO>> CreateEmployee(EmployeeCreateDTO employee)
        {
            var createdEmployee = await _employeeRepository.AddEmployee(_mapper.Map<Employee>(employee));

            ApplicationUser user = new ApplicationUser()
            {
                Email = createdEmployee.Email,
                PhoneNumber = createdEmployee.PhoneNumber,
                UserName = createdEmployee.Email,
                PersonName = createdEmployee.Email
            };

            var workplace = await _workplaceRepository.GetWorkplaceById(createdEmployee.WorkplaceId);

            IdentityResult result = await _userManager.CreateAsync(user, employee.Password);

            if (result.Succeeded)
            {
                if (await _roleManager.FindByNameAsync(workplace?.WorkplaceName) is null)
                {
                    ApplicationRole newRole = new ApplicationRole()
                    {
                        Name = workplace?.WorkplaceName
                    };
                    await _roleManager.CreateAsync(newRole);
                }
                await _userManager.AddToRoleAsync(user, workplace?.WorkplaceName);
            }

            return CreatedAtAction("GetEmployee", new { id = createdEmployee.EmployeeId }, _mapper.Map<EmployeeDTO>(createdEmployee));
        }

        [HttpPut]
        [Authorize(Roles ="Admin, Menadzer")]
        public async Task<ActionResult<EmployeeDTO>> UpdateEmployee(EmployeeUpdateDTO employee)
        {
            var matchingEmployee = await _employeeRepository.GetEmployeeById(employee.EmployeeId);
            if (matchingEmployee == null)
            {
                return NotFound();
            }

            Employee oldEmployee = new Employee()
            {
                EmployeeId = matchingEmployee.EmployeeId,
                FirstName = matchingEmployee.FirstName,
                LastName = matchingEmployee.LastName,
                Email = matchingEmployee.Email,
                Jmbg = matchingEmployee.Jmbg,
                PhoneNumber = matchingEmployee.PhoneNumber,
                Address = matchingEmployee.Address,
                City = matchingEmployee.City,
                Sallary = matchingEmployee.Sallary,
                DateOfEmployment = matchingEmployee.DateOfEmployment,
                WorkplaceId = matchingEmployee.WorkplaceId,
                OrganizationalUnitId = matchingEmployee.OrganizationalUnitId
            };

            var updatedEmployee = await _employeeRepository.UpdateEmployee(_mapper.Map<Employee>(employee));
            var user = await _userManager.FindByEmailAsync(oldEmployee.Email);
            user.Email = updatedEmployee.Email;
            user.PhoneNumber = updatedEmployee.PhoneNumber;
            user.UserName = updatedEmployee.Email;
            user.PersonName = updatedEmployee.Email;
            
            var result = await _userManager.UpdateAsync(user);
            if (!string.IsNullOrEmpty(employee.Password))
            {
                await _userManager.RemovePasswordAsync(user);
                await _userManager.AddPasswordAsync(user, employee.Password);
            }

            if (result.Succeeded)
            {
                if (oldEmployee.WorkplaceId != updatedEmployee.WorkplaceId)
                {
                    var oldWorkplace = await _workplaceRepository.GetWorkplaceById(oldEmployee.WorkplaceId);
                    var newWorkplace = await _workplaceRepository.GetWorkplaceById(updatedEmployee.WorkplaceId);

                    if (await _roleManager.FindByNameAsync(newWorkplace?.WorkplaceName) is null)
                    {
                        ApplicationRole newRole = new ApplicationRole()
                        {
                            Name = newWorkplace?.WorkplaceName
                        };
                        await _roleManager.CreateAsync(newRole);
                    }

                    await _userManager.RemoveFromRoleAsync(user, oldWorkplace?.WorkplaceName);
                    await _userManager.AddToRoleAsync(user, newWorkplace?.WorkplaceName);
                }
            }
            else
            {
                string errorMessage = string.Join(" | ", result.Errors.Select(e => e.Description));
                return Problem(errorMessage);
            }

            return Ok(_mapper.Map<EmployeeDTO>(updatedEmployee));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await _employeeRepository.GetEmployeeById(id);

            if (employee == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByEmailAsync(employee.Email);
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                string errorMessage = string.Join(" | ", result.Errors.Select(e => e.Description));
                return Problem(errorMessage);
            }

            await _employeeRepository.DeleteEmployee(id);

            return NoContent();
        }
    }
}
