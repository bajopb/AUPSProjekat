import React, { useContext, useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import ProductionOrder from "./productionOrder";
import AddProductionOrder from "./addProductionOrder";
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const ProductionOrderList=()=>{

const [productionOrders, setProductionOrders]=useState();
const [isAddModalOpen, setAddModalOpen] = useState(false);
const context=useContext(AuthContext);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAdd = async (newData) => {
    if(context.type()!="Admin")
    {
      alert("Dodavanje je dozvoljeno samo administratoru.");
      return;
    }    try {
      const res = await api.post("productionOrder", newData);
      if (res.data) {
        swal("Uspesno ste dodali novi entitet!", "", "success")

          fetch();
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
        await api.delete('productionOrder/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};


  const fetch = async () => {
    try {
      const res = await api.get("productionOrder");
        setProductionOrders(res.data);
      
    } catch (error) {
      alert(error);
    }
  };

 


useEffect(() => {
    fetch();
  }, []);

 


  

return(
    <div>
      <h2>Nalozi  za proizvodnju</h2>
      <table>
        <thead>
          <tr>
            <th>Datum pocetka</th>
            <th>Datum zavrsetka</th>
            <th>Kolicina</th>
            <th>Beleska</th>
            <th>ID predmeta rada</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            productionOrders && productionOrders.length >0 && 
            productionOrders.map((e, index)=>
            (<ProductionOrder key={index} data={e}       onDelete={() => handleDelete(e.productionOrderId)} update={fetch}/>)
            
            )
        }
        <AddProductionOrder
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj nalog za proizvodnju</button>

    </div>
);

};


export default ProductionOrderList;



