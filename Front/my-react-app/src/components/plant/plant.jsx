import React, { useState } from "react";
import api from "../../api/api";
import UpdatePlant from "./updatePlant";
import swal from "sweetalert";
const Plant=({data, onDelete, update})=>{

    const [plant, setPlant] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setPlant(data);
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
        <td>{data.plantId}</td>
        <td>{data.plantName}</td>
        
        
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
        <UpdatePlant
          open={showModal}
          setOpen={setShowModal}
          data={plant}
          setData={setPlant}
          update={update}
        />
      )}
      </tr>
    );


};


export default Plant;