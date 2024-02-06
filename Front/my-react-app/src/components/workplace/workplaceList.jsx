import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import Workplace from "./workplace";
import AddWorkplace from "./addWorkplace";

const WorkplaceList=()=>{

const [workplaces, setWorkplaces]=useState();
const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    fetch();
  };

  const handleAdd = async (newData) => {
    console.log("Dodavanje organizacione jedinice:", newData);
    try {
      const res = await api.post("workplace", newData);
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
      const res = await api.get("workplace");
      if (res.data) {
          console.log(res.data);
        setWorkplaces(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async(id) => {
    try {
        await api.delete('workplace/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};

return(
    <div>
      <h2>Radna mesta</h2>
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
            workplaces && workplaces.length >0 && 
            workplaces.map((e, index)=>
            (<Workplace key={index} data={e}       onDelete={() => handleDelete(e.workplaceId)} update={()=>fetch()}/>)
            )
        }
        <AddWorkplace
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj radno mesto</button>
    </div>
);

};


export default WorkplaceList;



