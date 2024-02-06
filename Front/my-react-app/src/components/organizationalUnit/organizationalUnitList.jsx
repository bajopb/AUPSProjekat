import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import OrganizationalUnit from "./otganiaztionalUnit";
import AddOrganizationalUnit from "./addOrganiaztionalUnit";

const OrganizationalUnitList=()=>{

const [organizationalUnits, setOrganizationalUnits]=useState();
const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    fetch();
  };

  const handleAdd = async (newData) => {
    try {
      const res = await api.post("organizationalUnit", newData);
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
      const res = await api.get("organizationalUnit");
      if (res.data) {
          console.log(res.data);
        setOrganizationalUnits(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  
  const handleDelete = async(id) => {
    console.log(id);
    try {
        await api.delete('organizationalUnit/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};

return(
    <div>
      <h2>Organizacione jedinice</h2>
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
            organizationalUnits && organizationalUnits.length >0 && 
            organizationalUnits.map((e, index)=>
            (<OrganizationalUnit key={index} data={e} onDelete={() => handleDelete(e.organizationalUnitId)} update={fetch}/>)
            )
        }
        <AddOrganizationalUnit
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj organizacionu jedinicu</button>

    </div>
);

};


export default OrganizationalUnitList;



