import React, { useContext, useEffect, useState } from "react";
import Employee from "./employee";
import api from "../../api/api";
import "../style/style.css"
import AddEmployee from "./addEmployee";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const EmployeeList=()=>{
const context=useContext(AuthContext);

const [employees, setEmployees]=useState();
const [isAddEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

  const handleOpenAddEmployeeModal = () => {
    setAddEmployeeModalOpen(true);
  };

  const handleCloseAddEmployeeModal = () => {
    setAddEmployeeModalOpen(false);
  };

  const handleAddEmployee = async (newEmployeeData) => {
    if(context.type()!="Admin")
    {
      swal({
        title: "Nemate pravo na dodavanje:(",
        text: "Dodavanje je dozvoljeno samo administratorima?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Ok", [true]]
      });
      
      return;
    }
    try {
      const res = await api.post("employee", newEmployeeData);
      swal("Uspesno ste dodali novi entitet!", "", "success")
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
    if(context.type()!="Admin")
    {
      swal({
        title: "Nemate pravo na brisanje:(",
        text: "Brisanje je dozvoljeno samo administratorima?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Ok", [true]]
      });
      
      return;
    }
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



