import React, { useState } from "react";
import api from "../../api/api";
import UpdateProductionPlan from "./updateProductionPlan";
import swal from "sweetalert";
const ProductionPlan=({data, onDelete, update})=>{

    const [productionPlan, setProductionPlan] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setProductionPlan(data);
        setShowModal(true);


    };



    const handleDelete=async(e)=>{

      e.preventDefault();
      const willDelete = await swal({
        title: "Da li ste sigurni?",
        text: "Da li ste sigurni da zelite da obrisete obrisete ovaj entitet?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Ne", true]
      });
      
      if (willDelete) {
        swal("Obrisano!", "", "success");
        onDelete(); 
      }
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