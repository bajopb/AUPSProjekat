import React, { useEffect, useState } from "react";
import Employee from "./employee";
import api from "../../api/api";
import "../style/style.css"
import AddEmployee from "./addEmployee";

const EmployeeList=()=>{

const [employees, setEmployees]=useState();
const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

  const handleOpenAddEmployeeModal = () => {
    setAddEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setAddEmployeeModalOpen(false);
    fetchEmployees();
  };

  const handleAddEmployee = async (newEmployeeData) => {
    try {
      const res = await api.post("employee", newEmployeeData);
        fetchEmployees();      
    } catch (error) {
      alert(error);
    }
  };
useEffect(() => {
    

    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("employee");
      if (res.data) {
        setEmployees(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async(id) => {
    try {
        await api.delete('employee/' + id);
            fetchEmployees();
        
      } catch (error) {
        alert(error);
      }
};

return(
    <div>
      <h2>Radnici</h2>
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Adresa</th>
            <th>Grad</th>
            <th>Broj telefona</th>
            <th>Radno mesto</th>
            <th>Organizaciona jedinica</th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
        {
            employees && employees.length >0 && 
            employees.map((e, index)=>
            (<Employee key={index} data={e} onDelete={() => handleDelete(e.employeeId)} update={fetchEmployees}/>)
            )
        }
        <AddEmployee
        isOpen={isAddEmployeeModalOpen}
        onRequestClose={handleCloseAddEmployeeModal}
        onAddEmployee={handleAddEmployee}
      />
        </tbody>

      </table>
      <button className="button-add"  onClick={handleOpenAddEmployeeModal}>Dodaj radnika</button>
    </div>
);

};


export default EmployeeList;



