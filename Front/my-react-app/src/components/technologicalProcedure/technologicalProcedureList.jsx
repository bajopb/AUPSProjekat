import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import TechnologicalProcedure from "./technologicalProcedure";
import AddTechnologicalProcedure from "./addTechnologicalProcedure";
import swal from "sweetalert";
import AuthContext from "../../context/authContext";
const TechnologicalProcedureList=()=>{

const [technologicalProcedures, setTechnologicalProcedures]=useState();
const [isAddModalOpen, setAddModalOpen] = useState(false);
const context=useContext(AuthContext);
  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    fetch();
  };

  const handleAdd = async (newData) => {
    if(context.type()!="Admin")
    {
      swal({
        title: "Nemate pravo na dodavanje:(",
        text: "Dodavanje je dozvoljeno samo administratorima?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Ok", [true]]
      });
      
      return;
    }    try {
      const res = await api.post("technologicalProcedure", newData);
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
      const res = await api.get("technologicalProcedure");
      if (res.data) {
        setTechnologicalProcedures(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  
  const handleDelete = async(id) => {
    if(context.type()!="Admin")
    {
      swal({
        title: "Nemate pravo na brisanje:(",
        text: "Brisanje je dozvoljeno samo administratorima.",
        icon: "warning",
        dangerMode: true,
        buttons: ["Ok", [true]]
      });
      
      return;
    }
    try {
        await api.delete('technologicalProcedure/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};

return(
    <div>
      <h2>Tehnoloski postupak</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Trajanje</th>
            <th>Organziaciona jedinica</th>
            <th>Postrojenje</th>
            <th>Tehnoloski sistem</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            technologicalProcedures && technologicalProcedures.length >0 && 
            technologicalProcedures.map((e, index)=>
            (<TechnologicalProcedure key={index} data={e} onDelete={() => handleDelete(e.technologicalProcedureId)} update={fetch}/>)
            )
        }
        <AddTechnologicalProcedure
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj tehnoloski postupal</button>

    </div>
);

};


export default TechnologicalProcedureList;



