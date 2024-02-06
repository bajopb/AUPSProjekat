import React, { useState } from "react";
import Modal from "react-modal";

const AddTechnologicalSystem = ({ isOpen, onRequestClose, onAdd }) => {
  const [technologicalSystemData, setTechnologicalSystemData] = useState({
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTechnologicalSystemData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(technologicalSystemData);
    setTechnologicalSystemData({
        technologicalSystemName: 0,
      
      
    });
    onRequestClose();
  };


  



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj tehnoloski sistem"
      ariaHideApp={false}
    >
      <h2>Dodaj tehnoloski sistem</h2>
      <form onSubmit={handleSubmit}>
            
          
          
          <label>
            Naziv:
            <input
              type="text"
              id="technologicalSystemName"
              value={technologicalSystemData.technologicalSystemName}
              onChange={handleChange}
            />
          </label>
          
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddTechnologicalSystem;
