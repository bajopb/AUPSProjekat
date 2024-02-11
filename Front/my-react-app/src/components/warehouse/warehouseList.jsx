import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import Warehouse from "./warehouse";
import AddWarehouse from "./addWarehouse";
import swal from "sweetalert";
import AuthContext from "../../context/authContext";

const WarehouseList=()=>{

const [warehouses, setWarehouses]=useState();
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
    }    
    
    try {
      const res = await api.post("warehouse", newData);
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
      const res = await api.get("warehouse");
      if (res.data) {
          console.log(res.data);
        setWarehouses(res.data);
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
        await api.delete('warehouse/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};



return(
    <div>
      <h2>Skladiste</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Adresa</th>
            <th>Grad</th>
            <th>Kapacitet</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            warehouses && warehouses.length >0 && 
            warehouses.map((e, index)=>
            (<Warehouse key={index} data={e} onDelete={() => handleDelete(e.warehouseId)} update={fetch}/>)
            )
        }
        <AddWarehouse
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj skladiste</button>
    </div>
);

};


export default WarehouseList;



