import React, { useEffect } from "react";
import { useState } from "react";
import api from "../../api/api.js"


const Employee=({employee, refresh})=>{

const [showUpdateModal, setShowUpdateModal] = useState(false);
const [employeeToUpdate, setEmployeeToUpdate] = useState(null); 

const handleDelete=async(id)=>{
    try {
        await api.delete("employee" + id);
        return true;
       } catch (e) {
         alert(e.response.data.Exception);
         return false;
       }

};
const handleUpdate=async(employee)=>{

    setShowUpdateModal(true);
    setEmployeeToUpdate(employee);

    
};


const updateEmployees=async(data)=>{
    try {
        const res = await api.put("employee", data, { headers: { "Content-Type":"multipart/form-data" }});
        updateEmployees(data);
        setOpen(false);

        return true;
    }
    catch(e) {
        alert(e.response.data.Exception);
        return false;
    }
};


    return(
    <>
        <tr>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.address}</td>
            <td>{employee.city}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.workplaceName}</td>
            <td>{employee.organizationalUnitName}</td>
            <td><button type="button" onClick={(e)=>handleUpdate(employee)} className="btn-upadte">Izmeni</button></td>
            <td><button type="button"  onClick={(e)=>handleDelete(employee.employeeId)} className="btn-delete">Obrisi</button></td>
        </tr>
        {showUpdateModal && (
        <UpdateEmployee
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          employee={employeeToUpdate}
          updateEmployees={updateEmployees}
          />)}
    </>
    );
};

export default Employee;