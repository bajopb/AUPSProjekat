import React, { useState } from "react";
import Modal from "react-modal";

const AddMaterial = ({ isOpen, onRequestClose, onAdd }) => {
  const [materialData, setMaterialData] = useState({
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setMaterialData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(materialData);
    setMaterialData({
      materialName: "",
      stockQuantity:""
      
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
      contentLabel="Dodaj materijal"
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>Dodaj materijal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv:
          <input
            type="text"
            id="materialName"
            value={materialData.materialName}
            onChange={handleChange}
required
          />
        </label>
        <label>
          Kolicina:
          <input
            type="text"
            id="stockQuantity"
            value={materialData.stockQuantity}
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

export default AddMaterial;
