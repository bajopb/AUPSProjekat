import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import TechnologicalSystem from "./technologicalSystem";
import AddTechnologicalSystem from "./addTechnologicalSystem";
const TechnologicalSystemList=()=>{

const [technologicalSystems, setTechnologicalSystems]=useState();
const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    fetch();
  };

  const handleAdd = async (newData) => {
    console.log("Dodavanje tehnoloski sistem:", newData);
    try {
      const res = await api.post("technologicalSystem", newData);
      fetch();
    } catch (error) {
      alert(error);
    }
  };
useEffect(() => {
    
    fetch();
  }, []);

  const fetch = async () => {
    console.log("tada");

    try {
      const res = await api.get("technologicalSystem");
      if (res.data) {
          console.log(res.data);
        setTechnologicalSystems(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async(id) => {
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



