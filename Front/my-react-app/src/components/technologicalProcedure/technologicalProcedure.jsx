import React, { useState } from "react";
import api from "../../api/api";
import UpdateTechnologicalProcedure from "./updateTechnologicalProcedure";
const TechnologicalProcedure=({data, onDelete, update})=>{

    const [technologicalProcedure, setTechnologicalProcedure] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setTechnologicalProcedure(data);
        setShowModal(true);


    };



    const handleDelete=(e)=>{

      e.preventDefault();
      onDelete();
     };
      

    


    return(

        <tr>
        <td>{data.technologicalProcedureId}</td>
        <td>{data.technologicalProcedureName}</td>
        <td>{data.duration}</td>
        <td>{data.organizationalUnitName}</td>
        <td>{data.technologicalSystemName}</td>
        
        
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
        <UpdateTechnologicalProcedure
          open={showModal}
          setOpen={setShowModal}
          data={technologicalProcedure}
          setData={setTechnologicalProcedure}
          update={update}
        />
      )}
      </tr>
    );


};


export default TechnologicalProcedure;