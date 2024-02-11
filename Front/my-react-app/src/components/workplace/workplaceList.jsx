import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import Workplace from "./workplace";
import AddWorkplace from "./addWorkplace";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";



const WorkplaceList=()=>{

const [workplaces, setWorkplaces]=useState();
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
      const res = await api.post("workplace", newData);  
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
      const res = await api.get("workplace");
      if (res.data) {
        setWorkplaces(res.data);
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
        await api.delete('workplace/' + id);

            fetch();
                swal("Obrisano!", "", "success");

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



