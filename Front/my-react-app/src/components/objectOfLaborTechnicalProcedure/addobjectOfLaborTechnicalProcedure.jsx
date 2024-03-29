import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";

const AddObjectOfLaborTechnologicalProcedure = ({ isOpen, onRequestClose, onAdd, objectOfLaborId }) => {
  const [objectOfLaborTechnologicalProcedureData, setObjectOfLaborTechnologicalProcedureData] = useState({
  });
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
    const { id, value } = e.target;
    setObjectOfLaborTechnologicalProcedureData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("objectOfLaborId", objectOfLaborId);
    formData.append("orderOfExecution", objectOfLaborTechnologicalProcedureData.orderOfExecution);
    formData.append("technologicalProcedureId", objectOfLaborTechnologicalProcedureData.technologicalProcedureId);
    onAdd(formData);
    setObjectOfLaborTechnologicalProcedureData({
      orderOfExecution:0,
      objectOfLaborId:"",
      technologicalProcedureId:"",
      

      
    });
    onRequestClose();
  };


  const handleChangeNumber=(e)=>{
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setObjectOfLaborTechnologicalProcedureData({
      ...objectOfLaborTechnologicalProcedureData,
      [e.target.id]: value,
    });
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj materijal za tehnoloski postupal"
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>Dodaj tehnoloski postupak</h2>
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
              value={objectOfLaborTechnologicalProcedureData.orderOfExecution}
              onChange={handleChangeNumber}
              required
            />
          </label>
          
          <label>
          Tehnoloski postupak:
          <select
            id="technologicalProcedureId"
            value={objectOfLaborTechnologicalProcedureData.technologicalProcedureId}
            onChange={handleChange}
required
          >
            <option value="" >
              Izaberite postupak
            </option>
            {technologicalProcedures ? technologicalProcedures.map((workplace) => (
              <option key={workplace.technologicalProcedureId} value={workplace.technologicalProcedureId}>
                {workplace.technologicalProcedureName}
              </option>
            )) : <option disabled>Ne postoje tehnoloski postupci</option>}
          </select>
        </label>
                <button type="submit">Dodaj</button>
                <button className="close-button" onClick={onRequestClose}>
              Izadji
            </button>
      </form>
    </Modal>
  );
};

export default AddObjectOfLaborTechnologicalProcedure;
