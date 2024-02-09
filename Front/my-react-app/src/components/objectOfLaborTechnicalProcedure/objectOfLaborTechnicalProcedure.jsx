import React, { useState } from "react";
import api from "../../api/api";
import UpdateObjectOfLaborTechnologicalProcedure from "./updateobjectOfLaborTechnicalProcedure";
import swal from "sweetalert";
const ObjectOfLaborTechnologicalProcedure=({data, onDelete, update, objectOfLaborId})=>{

    const [objectOfLaborTechnologicalProcedure, setObjectOfLaborTechnologicalProcedure] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setObjectOfLaborTechnologicalProcedure(data);
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
        <td>{data.orderOfExecution}</td>
        <td>{data.objectOfLaborName}</td>
        <td>{data.technologicalProcedureName}</td>
        
        
        <td>
          <button onClick={handleUpdate} className="btn-update">
            Update
          </button>
        </td>
        <td>
          <button onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </td>
        {showModal && (
        <UpdateObjectOfLaborTechnologicalProcedure
          open={showModal}
          setOpen={setShowModal}
          data={objectOfLaborTechnologicalProcedure}
          setData={setObjectOfLaborTechnologicalProcedure}
          update={update}
          objectOfLaborId={objectOfLaborId}
        />
      )}
      </tr>
    );


};


export default ObjectOfLaborTechnologicalProcedure;