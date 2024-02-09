import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import TechnologicalSystem from "./technologicalSystem";
import AddTechnologicalSystem from "./addTechnologicalSystem";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const TechnologicalSystemList=()=>{

const [technologicalSystems, setTechnologicalSystems]=useState();
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
      alert("Dodavanje je dozvoljeno samo administratoru.");
      return;
    }    try {
      const res = await api.post("technologicalSystem", newData);
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
      const res = await api.get("technologicalSystem");
      if (res.data) {
        setTechnologicalSystems(res.data);
      }
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
        await api.delete('technologicalSystem/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};

  

return(
    <div>
      <h2>Tehnoloski sistem</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            technologicalSystems && technologicalSystems.length >0 && 
            technologicalSystems.map((e, index)=>
            (<TechnologicalSystem key={index} data={e} onDelete={() => handleDelete(e.technologicalSystemId) } update={fetch}/>)
            )
        }
        <AddTechnologicalSystem
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj tehnoloski sistem</button>
    </div>
);

};


export default TechnologicalSystemList;



