import React, { useState } from "react";
import api from "../../api/api";
import UpdateTechnologicalProcedure from "./updateTechnologicalProcedure";
import swal from "sweetalert";
const TechnologicalProcedure=({data, onDelete, update})=>{

    const [technologicalProcedure, setTechnologicalProcedure] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setTechnologicalProcedure(data);
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
        <td>{data.technologicalProcedureId}</td>
        <td>{data.technologicalProcedureName}</td>
        <td>{data.duration}</td>
        <td>{data.organizationalUnitName}</td>
        <td>{data.plantName}</td>
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
        <UpdateTechnologicalProcedure
          open={showModal}
          setOpen={setShowModal}
          data={technologicalProcedure}
          setData={setTechnologicalProcedure}
          update={update}
        />
      )}
      </tr>
    );


};


export default TechnologicalProcedure;