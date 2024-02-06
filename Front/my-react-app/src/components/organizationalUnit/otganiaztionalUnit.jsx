import React, { useState } from "react";
import api from "../../api/api";
import UpdateOrganizationalUnit from "./updateOrganizationalUnit";

const OrganizationalUnit=({data, onDelete,update})=>{

    const [organizationalUnit, setOrganizationalUnit] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setOrganizationalUnit(data);
        setShowModal(true);


    };



    const handleDelete = (e) => {
      e.preventDefault();
      onDelete(); 
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