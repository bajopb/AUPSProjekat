import React, { useState } from "react";
import UpdateEmployee from "./updateEmployee";
import api from "../../api/api";


const Employee=({data, onDelete, update})=>{

    const [employee, setEmployee] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setEmployee(data);
        setShowModal(true);


    };



    const handleDelete = (e) => {
        e.preventDefault();
        onDelete(); 
      };
      

    


    return(

        <tr>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{data.address}</td>
        <td>{data.city}</td>
        <td>{data.phoneNumber}</td>
        <td>{data.workplaceName}</td>
        <td>{data.organizationalUnitName}</td>
        
        <td>
          <button  onClick={handleUpdate} className="btn-update">
            Update
          </button>
        </td>
        <td>
          <button  onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </td>
        {showModal && (
        <UpdateEmployee
          open={showModal}
          setOpen={setShowModal}
          data={employee}
          setData={setEmployee}
          update={update}
        />
      )}
      </tr>
    );


};


export default Employee;