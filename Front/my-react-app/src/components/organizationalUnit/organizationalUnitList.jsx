import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import OrganizationalUnit from "./otganiaztionalUnit";
import AddOrganizationalUnit from "./addOrganiaztionalUnit";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const OrganizationalUnitList=()=>{
const context=useContext(AuthContext);
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
    if(context.type()!="Admin")
    {
      alert("Dodavanje je dozvoljeno samo administratoru.");
      return;
    }
    try {
      const res = await api.post("organizationalUnit", newData);
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
    if(context.type()!="Admin")
    {
      alert("Brisanje je dozvoljeno samo administratoru.");
      return;
    }
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



