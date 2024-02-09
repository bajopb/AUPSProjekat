import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import ObjectOfLabor from "./objectOfLabor";
import AddObjectOfLabor from "./addObjectOfLabor";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const ObjectOfLaborList=()=>{
const context=useContext(AuthContext);
const [objectOfLabors, setObjectOfLabors]=useState();
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
      const res = await api.post("objectOfLabor", newData);
      if (res.data) {
        swal("Uspesno ste dodali novi entitet!", "", "success")

          fetch();
      }
    } catch (error) {
      alert(error);
    }
  };
useEffect(() => {
    

    fetch();
  }, []);

  const fetch = async () => {
    try {
      const res = await api.get("objectOfLabor");
      if (res.data) {
        setObjectOfLabors(res.data);
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
        await api.delete('objectOfLabor/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};
return(
    <div>
      <h2>Predmet rada</h2>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opis</th>
            <th>Cena</th>
            <th>Kolicina</th>
            <th>ID skladista</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            objectOfLabors && objectOfLabors.length >0 && 
            objectOfLabors.map((e, index)=>
            (<ObjectOfLabor key={index} data={e}  onDelete={() => handleDelete(e.objectOfLaborId)} update={fetch}/>)
            )
        }
        <AddObjectOfLabor
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj predmet rada</button>

    </div>
);

};


export default ObjectOfLaborList;



