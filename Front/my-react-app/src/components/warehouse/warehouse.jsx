import React, { useState } from "react";
import api from "../../api/api";
import UpdateWarehouse from "./updateWarehouse";
const Warehouse=({data, onDelete, update})=>{

    const [warehouse, setWarehouse] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setWarehouse(data);
        setShowModal(true);


    };



    const handleDelete=(e)=>{

      e.preventDefault();
      onDelete();
     };
      

    


    return(

        <tr>
        <td>{data.warehouseId}</td>
        <td>{data.address}</td>
        <td>{data.city}</td>
        <td>{data.capacity}</td>
        
        
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
        <UpdateWarehouse
          open={showModal}
          setOpen={setShowModal}
          data={warehouse}
          setData={setWarehouse}
          update={update}
        />
      )}
      </tr>
    );


};


export default Warehouse;