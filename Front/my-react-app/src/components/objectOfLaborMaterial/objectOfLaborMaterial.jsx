import React, { useState } from "react";
import api from "../../api/api";
import UpdateObjectOfLaborMaterial from "./updateObjectOfLaborMaterial";
import swal from "sweetalert";
const ObjectOfLaborMaterial=({data, onDelete, update, objectOfLaborId})=>{

    const [objectOfLaborMaterial, setObjectOfLaborMaterial] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setObjectOfLaborMaterial(data);
        setShowModal(true);


    };



    const handleDelete =  async(e) => {
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