import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";


const AddTechnologicalProcedure = ({ isOpen, onRequestClose, onAdd}) => {
  const [technologicalProcedureData, setTechnologicalProcedureData] = useState({
  });

  const [organizationalUnits, setOrganizationalUnits]=useState();
  const [plants, setPlants]=useState();
  const [technologicalSystems, setTechnologicalSistems]=useState();


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("organizationalUnit");
        if (res.data) {
            console.log(res.data);
          setOrganizationalUnits(res.data);
        }
      } catch (error) {
        alert(error);
      }

      



    try {
      const res = await api.get("plant");
      if (res.data) {
          console.log(res.data);
        setPlants(res.data);
      }
    } catch (error) {
      alert(error);
    }

    
    try {
      const res = await api.get("technologicalSystem");
      if (res.data) {
          console.log(res.data);
        setTechnologicalSistems(res.data);
      }
    } catch (error) {
      alert(error);
    }

    




  };


    fetchEmployees();
  }, []);






  const handleChange = (e) => {
    const { id, value } = e.target;
    setTechnologicalProcedureData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(technologicalProcedureData);
    setTechnologicalProcedureData({
        technologicalProcedureName:"",
        duration:0,
        organizationalUnitId:"",
        plantId:"",
        technologicalSystemId:""
      
      
    });
    onRequestClose();
  };


  
  const handleChangeDuration=(e)=>{
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setTechnologicalProcedureData({
      ...technologicalProcedureData,
      [e.target.id]: value,
    });
  }



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj tehnoloski postupak"
      ariaHideApp={false}
    >
      <h2>Dodaj tehnoloski sistem</h2>
      <form onSubmit={handleSubmit}>
            
          
          
          <label>
            Naziv:
            <input
              type="text"
              id="technologicalProcedureName"
              value={technologicalProcedureData.technologicalProcedureName}
              onChange={handleChange}
            />
          </label>
          <label>
            Trajanje:
            <input
              type="number"
              id="duration"
              value={technologicalProcedureData.duration}
              onChange={handleChangeDuration}
            />
          </label>
          <label>
          Organizaciona jedinica:
          <select
            id="organizationalUnitId"
            value={technologicalProcedureData.organizationalUnitId}
            onChange={handleChange}
          >
            <option value="" >
              Izaberite organizacionu jedinicu
            </option>
            {organizationalUnits ? organizationalUnits.map((workplace) => (
              <option key={workplace.organizationalUnitId} value={workplace.organizationalUnitId}>
                {workplace.organizationalUnitName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
        <label>
          Postrojenje:
          <select
            id="plantId"
            value={technologicalProcedureData.plantId}
            onChange={handleChange}
          >
            <option value="" >
              Izaberite postrojenje
            </option>
            {plants ? plants.map((workplace) => (
              <option key={workplace.plantId} value={workplace.plantId}>
                {workplace.plantName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
        <label>
          Tehnoloski sistem:
          <select
            id="technologicalSystemId"
            value={technologicalProcedureData.technologicalSystemId}
            onChange={handleChange}
          >
            <option value="" >
              Izaberite tehnoloski sistem
            </option>
            {technologicalSystems ? technologicalSystems.map((workplace) => (
              <option key={workplace.technologicalSystemId} value={workplace.technologicalSystemId}>
                {workplace.technologicalSystemName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
          
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddTechnologicalProcedure;
