import React from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState, useEffect } from "react";
import "../style/style.css"

const UpdateObjectOfLaborTechnologicalProcedure = ({ open, setOpen, data, setData, update,  objectOfLaborId}) => {
  const handleClose = () => setOpen(false);
  const[technologicalProcedures, setTechnologicalProcedures]=useState();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("technologicalProcedure");
        if (res.data) {
          setTechnologicalProcedures(res.data);
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
    if (
      !data.orderOfExecution ||
      !data.objectOfLaborId ||
      !data.technologicalProcedureId 
      
      )
      {
      alert("Sva polja su obavezna");
      return;
    }

    const formData=new FormData();
    formData.append("objectOfLaborId", objectOfLaborId);
    formData.append("orderOfExecution", data.orderOfExecution);
    formData.append("technologicalProcedureId", data.technologicalProcedureId);
    formData.append("objectOfLaborTechnologicalProcedureId", data.objectOfLaborTechnologicalProcedureId);
    
    try {
        const res = await api.put("objectOfLaborTechnologicalProcedure", formData);
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        alert(error);
      }
      update();
    setOpen(false);
  };


  const handleChangeNumber=(e)=>{
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setData({
      ...data,
      [e.target.id]: value,
    });
  }


  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o materijalu predmeta rada"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
        <label>
            ID predmeta rada:
            <input
              type="text"
              id="objectOfLaborId"
              value={objectOfLaborId}
              disabled
            />
          </label>
          
          <label>
            Nalog za izvrsenje:
            <input
              type="number"
              id="orderOfExecution"
              value={data.orderOfExecution}
              onChange={handleChangeNumber}
            />
          </label>
          
          <label>
          Tehnoloski postupak:
          <select
            id="technologicalProcedureId"
            value={data.technologicalProcedureId}
            onChange={handleChange}
          >
            <option value="" >
              Izaberite postupak
            </option>
            {technologicalProcedures ? technologicalProcedures.map((workplace) => (
              <option key={workplace.technologicalProcedureId} value={workplace.technologicalProcedureId}>
                {workplace.technologicalProcedureName}
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

export default UpdateObjectOfLaborTechnologicalProcedure;
