import React, { useState } from "react";
import api from "../../api/api";
import UpdateObjectOfLabor from "./updateObjectOfLabor";
import { useNavigate } from "react-router-dom";
const ObjectOfLabor=({data, onDelete, update})=>{

    const [objectOfLabor, setObjectOfLabor] = useState({});
    const [showModal, setShowModal]=useState(false);
    const navigate=useNavigate();
    const handleUpdate=()=>{
        setObjectOfLabor(data);
        setShowModal(true);


    };



    const handleDelete = (e) => {
        e.preventDefault();
        onDelete();
      };
      
      const handleObjectOfLaborClick=()=>{
        navigate(`/objectOfLaborInfo/${data.objectOfLaborId}`);
            };
    


    return(

        <tr >
        <td onClick={handleObjectOfLaborClick}>{data.objectOfLaborName}</td>
        <td onClick={handleObjectOfLaborClick}>{data.description}</td>
        <td onClick={handleObjectOfLaborClick}>{data.price}</td>
        <td onClick={handleObjectOfLaborClick}>{data.stockQuantity}</td>
        <td onClick={handleObjectOfLaborClick}>{data.warehouseId}</td>
        
        
        <td>
          <button onClick={handleUpdate} className="btn-update">
            Update
          </button>
        </td>
        <td>
          <button  onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </td>
        {showModal && (
        <UpdateObjectOfLabor
          open={showModal}
          setOpen={setShowModal}
          data={objectOfLabor}
          setData={setObjectOfLabor}
          update={update}
        />
      )}
      </tr>
    );


};


export default ObjectOfLabor;