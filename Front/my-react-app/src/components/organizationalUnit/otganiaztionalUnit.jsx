import React, { useState } from "react";
import api from "../../api/api";
import UpdateOrganizationalUnit from "./updateOrganizationalUnit";
import swal from "sweetalert";
const OrganizationalUnit=({data, onDelete,update})=>{

    const [organizationalUnit, setOrganizationalUnit] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setOrganizationalUnit(data);
        setShowModal(true);


    };



    const handleDelete = async(e) => {
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
        <td>{data.organizationalUnitId}</td>
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
        <UpdateOrganizationalUnit
          open={showModal}
          setOpen={setShowModal}
          data={organizationalUnit}
          setData={setOrganizationalUnit}
          update={update}
        />
      )}
      </tr>
    );


};


export default OrganizationalUnit;