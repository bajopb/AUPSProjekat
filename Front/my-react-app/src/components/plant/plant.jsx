import React, { useState } from "react";
import api from "../../api/api";
import UpdatePlant from "./updatePlant";
const Plant=({data, onDelete, update})=>{

    const [plant, setPlant] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setPlant(data);
        setShowModal(true);


    };



    const handleDelete = (e) => {
      e.preventDefault();
      onDelete(); 
    };
      

    


    return(

        <tr>
        <td>{data.plantId}</td>
        <td>{data.plantName}</td>
        
        
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
        <UpdatePlant
          open={showModal}
          setOpen={setShowModal}
          data={plant}
          setData={setPlant}
          update={update}
        />
      )}
      </tr>
    );


};


export default Plant;