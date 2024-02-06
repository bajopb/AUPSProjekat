import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";


const AddProductionPlan = ({ isOpen, onRequestClose, onAdd }) => {
  const [productionPlanData, setProductionPlanData] = useState({
  });


  const [objectsOfLabor, setObjectsOfLabor]=useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductionPlanData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(productionPlanData);
    setProductionPlanData({
      productionPlanName: "",
      description: "",
      objectOfLaborId: "",
      
    });
    onRequestClose();
  };


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("objectOfLabor");
        if (res.data) {
            console.log(res.data);
          setObjectsOfLabor(res.data);
        }
      } catch (error) {
        alert(error);
      }

     

    };

    fetchEmployees();
  }, []);



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj plan proizvodnje"
      ariaHideApp={false}
    >
      <h2>Dodaj plan proizvodnje</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv:
          <input
            type="text"
            id="productionPlanName"
            value={productionPlanData.productionPlanName}
            onChange={handleChange}
          />
        </label>
        <label>
            Opis:
          <input
            type="text"
            id="description"
            value={productionPlanData.description}
            onChange={handleChange}
          />
        </label>
        <label>
        Predmet rada:
          <select
            id="objectOfLaborId"
            value={productionPlanData.objectOfLaborId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Izaberite predmet rada
            </option>
            {objectsOfLabor ? objectsOfLabor.map((workplace) => (
              <option key={workplace.objectOfLaborId} value={workplace.objectOfLaborId}>
                {workplace.objectOfLaborName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
        
          <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddProductionPlan;
