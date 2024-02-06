import React, { useState } from "react";
import api from "../../api/api";
import UpdateProductionOrder from "./updateProductionOrder";
const ProductionOrder=({data, onDelete, update})=>{
    const [productionOrder, setProductionOrder] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setProductionOrder(data);
        setShowModal(true);

    };



   const handleDelete=(e)=>{

    e.preventDefault();
    onDelete();
   };
      

    


    return(

        <tr>
        <td>{data.startDate}</td>
        <td>{data.endDate}</td>
        <td>{data.quantity}</td>
        <td>{data.note}</td>
        <td>{data.objectOfLaborId}</td>
        
        
        <td>
          <button  onClick={handleUpdate} className="btn-update">
            Update
          </button>
        </td>
        <td>
          <button onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </td>
        {showModal && (
        <UpdateProductionOrder
          open={showModal}
          setOpen={setShowModal}
          data={productionOrder}
          setData={setProductionOrder}
          update={update}
        />
      )}
      </tr>
    );


};


export default ProductionOrder;