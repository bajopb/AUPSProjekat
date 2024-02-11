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
        technologicalSystemName: "",
      
      
    });
    onRequestClose();
  };

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
      contentLabel="Dodaj tehnoloski sistem"
      ariaHideApp={false}
      style={customStyles}
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
required
            />
          </label>
          
                <button type="submit">Dodaj</button>
                <button className="close-button" onClick={onRequestClose}>
              Izadji
            </button>
      </form>
    </Modal>
  );
};

export default AddTechnologicalSystem;
