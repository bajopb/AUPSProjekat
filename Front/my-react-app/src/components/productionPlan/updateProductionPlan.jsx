import React from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState, useEffect } from "react";
import "../style/style.css"
const UpdateProductionPlan = ({ open, setOpen, data, setData, update}) => {
  const handleClose = () => setOpen(false);
  const [objectsOfLabor, setObjectsOfLabor]=useState();



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
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (
      !data.productionPlanName  || !data.description || !data.objectOfLaborId)
      {
      alert("Sva polja su obavezna");
      return;
    }

    
    
    try {
        const res = await api.put("productionPlan", data);
        if (res.data) {
            console.log(res.data);
          setData(res.data);
        }
      } catch (error) {
        alert(error);
      }
      update();
    setOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o planu proizvodnje"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Naziv:
            <input
              type="text"
              id="productionPlanName"
              value={data.productionPlanName}
              onChange={handleChange}
            />
          </label>
          <label>
            Opis:
            <input
              type="text"
              id="description"
              value={data.description}
              onChange={handleChange}
            />
          </label>
          <label>
        Predmet rada:
          <select
            id="objectOfLaborId"
            value={data.objectOfLaborId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Izaberite organizacionu jedinicu
            </option>
            {objectsOfLabor ? objectsOfLabor.map((workplace) => (
              <option key={workplace.objectOfLaborId} value={workplace.objectOfLaborId}>
                {workplace.objectOfLaborName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
          
          <div className="modal-buttons">
            <button type="button" onClick={handleSubmit}>Izmeni</button>
            
            <button className="close-button" onClick={handleClose}>
              Izadji
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateProductionPlan;
