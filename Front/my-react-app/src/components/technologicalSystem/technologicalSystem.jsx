import React, { useState } from "react";
import api from "../../api/api";
import UpdateTechnologicalSystem from "./updateTechnologicaSystem";
const TechnologicalSystem=({data, onDelete, update})=>{

    const [technologicalSystem, setTechnologicalSystem] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setTechnologicalSystem(data);
        setShowModal(true);


    };



    const handleDelete=(e)=>{

      e.preventDefault();
      onDelete();
     };
      

    


    return(

        <tr>
        <td>{data.technologicalSystemId}</td>
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
        <UpdateTechnologicalSystem
          open={showModal}
          setOpen={setShowModal}
          data={technologicalSystem}
          setData={setTechnologicalSystem}
          update={update}
        />
      )}
      </tr>
    );


};


export default TechnologicalSystem;