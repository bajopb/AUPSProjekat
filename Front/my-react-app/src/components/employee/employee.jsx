import React, { useState } from "react";
import UpdateEmployee from "./updateEmployee";
import api from "../../api/api";
import swal from "sweetalert";

const Employee=({data, onDelete, update})=>{

    const [employee, setEmployee] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setEmployee(data);
        setShowModal(true);


    };



    const handleDelete = async (e) => {
        e.preventDefault();
        const willDelete = await swal({
          title: "Da li ste sigurni?",
          text: "Da li ste sigurni da zelite da obrisete obrisete ovaj entitet?",
          icon: "warning",
          dangerMode: true,
          buttons: ["Ne", true]
        });
        
        if (willDelete) {
          swal("Obrisano!", "", "success");
          onDelete(); 
        } 
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