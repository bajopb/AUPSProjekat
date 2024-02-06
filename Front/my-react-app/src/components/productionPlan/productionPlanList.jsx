import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "../style/style.css"
import ProductionPlan from "./productionPlan";
import AddProductionPlan from "./addProductionPlan";
const ProductionPlanList=()=>{

const [productionPlans, setProductionPlans]=useState();
const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    fetch();
  };

  const handleAdd = async (newData) => {
    console.log("Dodavanje postrojenaj:", newData);
    try {
      const res = await api.post("productionPlan", newData);
      if (res.data) {
          console.log(res.data);
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
      const res = await api.get("productionPlan");
      if (res.data) {
          console.log(res.data);
        setProductionPlans(res.data);
      }
    } catch (error) {
      alert(error);
    }
  };
  
  
  const handleDelete = async(id) => {
    try {
        await api.delete('productionPlan/' + id);
            fetch();
        
      } catch (error) {
        alert(error);
      }
};

return(
    <div>
      <h2>Plan proizvodnje</h2>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Opis</th>
            <th>ID predmeta rada</th>
            
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {
            productionPlans && productionPlans.length >0 && 
            productionPlans.map((e, index)=>
            (<ProductionPlan key={index} data={e} onDelete={() => handleDelete(e.productionPlanId)} update={fetch}/>)
            )
        }
        <AddProductionPlan
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        onAdd={handleAdd}
      />
        </tbody>
      </table>
      <button className="button-add" onClick={handleOpenAddModal}>Dodaj plan proizvodnje</button>

    </div>
);

};


export default ProductionPlanList;



