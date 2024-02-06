import React, { useState } from "react";
import api from "../../api/api";
import UpdateProductionPlan from "./updateProductionPlan";
const ProductionPlan=({data, onDelete, update})=>{

    const [productionPlan, setProductionPlan] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setProductionPlan(data);
        setShowModal(true);


    };



    const handleDelete=(e)=>{

      e.preventDefault();
      onDelete();
     };
      

    


    return(

        <tr>
        <td>{data.productionPlanName}</td>
        <td>{data.description}</td>
        <td>{data.objectOfLaborId}</td>
        
        
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
        <UpdateProductionPlan
          open={showModal}
          setOpen={setShowModal}
          data={productionPlan}
          setData={setProductionPlan}
          update={update}
        />
      )}
      </tr>
    );


};


export default ProductionPlan;