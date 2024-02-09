import React, { useState } from "react";
import api from "../../api/api";
import UpdateMaterial from "./updateMaterial";
import swal from "sweetalert";

const Material=({data, onDelete, update})=>{

    const [material, setMaterial] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setMaterial(data);
        setShowModal(true);
    };

    const handleDelete = async (e) => {
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