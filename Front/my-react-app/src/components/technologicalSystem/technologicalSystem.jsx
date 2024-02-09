import React, { useState } from "react";
import api from "../../api/api";
import UpdateTechnologicalSystem from "./updateTechnologicaSystem";
import swal from "sweetalert";
const TechnologicalSystem=({data, onDelete, update})=>{

    const [technologicalSystem, setTechnologicalSystem] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setTechnologicalSystem(data);
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
        <td>{data.technologicalSystemId}</td>
        <td>{data.technologicalSystemName}</td>
        
        
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
        <UpdateTechnologicalSystem
          open={showModal}
          setOpen={setShowModal}
          data={technologicalSystem}
          setData={setTechnologicalSystem}
          update={update}
        />
      )}
      </tr>
    );


};


export default TechnologicalSystem;