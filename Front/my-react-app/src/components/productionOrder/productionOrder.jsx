import React, { useState } from "react";
import api from "../../api/api";
import UpdateProductionOrder from "./updateProductionOrder";
import swal from "sweetalert";
const ProductionOrder=({data, onDelete, update})=>{
    const [productionOrder, setProductionOrder] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setProductionOrder(data);
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