import React, { useState } from "react";
import Modal from "react-modal";

const AddPlant = ({ isOpen, onRequestClose, onAdd }) => {
  const [plantData, setPlantData] = useState({
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPlantData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(plantData);
    setPlantData({
      plantName: ""
      
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
      contentLabel="Dodaj postrojenje"
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>Dodaj postrojenje</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv:
          <input
            type="text"
            id="plantName"
            value={plantData.plantName}
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

export default AddPlant;
