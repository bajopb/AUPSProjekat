import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import ObjectOfLaborMaterial from "./objectOfLaborMaterial";
import AddObjectOfLaborMaterial from "./addObjectOfLaborMaterial";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const ObjectOfLaborMaterialList=({objectOfLaborId})=>{
const context=useContext(AuthContext);
const [objectOfLaborMaterials, setObjectOfLaborMaterials]=useState();
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
      swal({
        title: "Nemate pravo na dodavanje:(",
        text: "Dodavanje je dozvoljeno samo administratorima?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Ok", [true]]
      });
      
      return;
    }
    try {
      const res = await api.post("objectOfLaborMaterial", newData);
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
      const res = await api.get("objectOfLaborMaterial");
        setObjectOfLaborMaterials(res.data);
      
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
        await api.delete('objectOfLaborMaterial/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};


return(
    <div>
      <h2>Materijali predmeta rada</h2>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Kolicina</th>
            <th>Kolicina na lageru</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            objectOfLaborMaterials && objectOfLaborMaterials.length >0 && 
            objectOfLaborMaterials.map((e, index)=>
            (<ObjectOfLaborMaterial key={index} data={e} onDelete={() => handleDelete(e.objectOfLaborMaterialId)} update={fetch} objectOfLaborId={objectOfLaborId}/>)
            )
        }
        <AddObjectOfLaborMaterial
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
        objectOfLaborId={objectOfLaborId}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj materijale predmeta rada</button>

    </div>
);

};


export default ObjectOfLaborMaterialList;



