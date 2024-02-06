import React, { useState } from "react";
import api from "../../api/api";
import UpdateMaterial from "./updateMaterial";

const Material=({data, onDelete, update})=>{

    const [material, setMaterial] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setMaterial(data);
        setShowModal(true);


    };



    const handleDelete = (e) => {
        e.preventDefault();
        onDelete();
      };
      

    


    return(

        <tr>
        <td>{data.materialName}</td>
        <td>{data.stockQuantity}</td>
        
        
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
        <UpdateMaterial
          open={showModal}
          setOpen={setShowModal}
          data={material}
          setData={setMaterial}
          update={update}
        />
      )}
      </tr>
    );


};


export default Material;