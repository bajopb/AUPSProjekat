import React, { useState } from "react";
import api from "../../api/api";
import UpdateObjectOfLaborMaterial from "./updateObjectOfLaborMaterial";
const ObjectOfLaborMaterial=({data, onDelete, update, objectOfLaborId})=>{

    const [objectOfLaborMaterial, setObjectOfLaborMaterial] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setObjectOfLaborMaterial(data);
        setShowModal(true);


    };



    const handleDelete = (e) => {
       e.preventDefault();
        onDelete();
      };
      

    


    return(

        <tr>
        <td>{data.materialName}</td>
        <td>{data.quantity}</td>
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
        <UpdateObjectOfLaborMaterial
          open={showModal}
          setOpen={setShowModal}
          data={objectOfLaborMaterial}
          setData={setObjectOfLaborMaterial}
          update={update}
          objectOfLaborId={objectOfLaborId}
        />
      )}
      </tr>
    );


};


export default ObjectOfLaborMaterial;