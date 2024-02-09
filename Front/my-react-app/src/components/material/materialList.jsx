import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import Material from "./material";
import AddMaterial from "./addMaterial";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const MaterialList=()=>{
const context=useContext(AuthContext);
const [materials, setMaterials]=useState();
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
      const res = await api.post("material", newData);
      if (res.data) {
        swal("Uspesno ste dodali novi entitet!", "", "success")

          fetch();
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async(id) => {
    try {
        await api.delete('material/' + id);
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
      const res = await api.get("material");
      
        setMaterials(res.data);
      
    } catch (error) {
      alert(error);
    }
  };

return(
    <div>
      <h2>Materijali</h2>
      <table>
        <thead>
          <tr>
            
            <th>Naziv</th>
            <th>Kolicina</th>
            <th></th>
            <th></th>
            
          </tr>
        </thead>
        <tbody>
        {
            materials && materials.length >0 && 
            materials.map((e, index)=>
            (<Material key={index} data={e} onDelete={() => handleDelete(e.materialId)} update={fetch} />)
            )
        }
        <AddMaterial
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj materijal</button>

    </div>
    
);

};


export default MaterialList;



