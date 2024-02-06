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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj materijal"
      ariaHideApp={false}
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
          />
        </label>
        <label>
          Kolicina:
          <input
            type="text"
            id="stockQuantity"
            value={materialData.stockQuantity}
            onChange={handleChange}
          />
        </label>
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddMaterial;
