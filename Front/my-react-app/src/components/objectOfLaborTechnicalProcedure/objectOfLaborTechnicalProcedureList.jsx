import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import ObjectOfLaborTechnologicalProcedure from "./objectOfLaborTechnicalProcedure";
import AddObjectOfLaborTechnologicalProcedure from "./addobjectOfLaborTechnicalProcedure";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";

const ObjectOfLaborTechnologicalProcedureList=({objectOfLaborId})=>{


const context=useContext(AuthContext);
const [objectOfLaborTechnologicalProcedures, setObjectOfLaborTechnologicalProcedures]=useState();
const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAdd = async (newData) => {
    if(context.type()!="Admin")
    {
      alert("Dodavanje je dozvoljeno samo administratoru.");
      return;
    }
    try {
      const res = await api.post("objectOfLaborTechnologicalProcedure", newData);
      swal("Uspesno ste dodali novi entitet!", "", "success")

        fetch();
    } catch (error) {
      alert(error);
    }
  };
useEffect(() => {
    
    fetch();
  }, []);

  const fetch = async () => {

    try {
      const res = await api.get("objectOfLaborTechnologicalProcedure");
        setObjectOfLaborTechnologicalProcedures(res.data);
       
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async(id) => {
    if(context.type()!="Admin")
    {
      alert("Brisanje je dozvoljeno samo administratoru.");
      return;
    }
    try {
        await api.delete('objectOfLaborTechnologicalProcedure/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};
  

return(
    <div>
      <h2>Tehnoloski postupak predmeta rada</h2>
      <table>
        <thead>
          <tr>
            <th>Nalog za izvrsenje</th>
            <th>Predmet rada</th>
            <th>Tehnoloski postupak</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            objectOfLaborTechnologicalProcedures && objectOfLaborTechnologicalProcedures.length >0 && 
            objectOfLaborTechnologicalProcedures.map((e, index)=>
            (<ObjectOfLaborTechnologicalProcedure key={index} data={e} onDelete={() => handleDelete(e.objectOfLaborTechnologicalProcedureId)} update={fetch} objectOfLaborId={objectOfLaborId}/>)
            )
        }
        <AddObjectOfLaborTechnologicalProcedure
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
        objectOfLaborId={objectOfLaborId}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj tehnoloski postupak</button>

    </div>
);

};


export default ObjectOfLaborTechnologicalProcedureList;



