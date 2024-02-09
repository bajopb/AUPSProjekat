import React, { useState } from "react";
import api from "../../api/api";
import UpdateWorkplace from "./udateWorkplace";
import swal from "sweetalert";
const Workplace=({data, onDelete, update})=>{

    const [workplace, setWorkplace] = useState({});
    const [showModal, setShowModal]=useState(false);

    const handleUpdate=()=>{
        setWorkplace(data);
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
        onDelete(); 
      }
     };
      

    


    return(

        <tr>
        <td>{data.workplaceId}</td>
        <td>{data.workplaceName}</td>
        
        
        <td>
          <button onClick={handleUpdate} className="btn-update">
            Update
          </button>
        </td>
        <td>
          <button  onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </td>
        {showModal && (
        <UpdateWorkplace
          open={showModal}
          setOpen={setShowModal}
          data={workplace}
          setData={setWorkplace}
          update={update}
        />
      )}
      </tr>
    );


};


export default Workplace;