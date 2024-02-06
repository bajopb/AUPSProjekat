import React, { useState } from "react";
import Modal from "react-modal";

const AddWorkplace = ({ isOpen, onRequestClose, onAdd }) => {
  const [workplaceData, setWorkplaceData] = useState({
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setWorkplaceData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(workplaceData);
    setWorkplaceData({
      workplaceName: ""
      
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj radno mesto"
      ariaHideApp={false}
    >
      <h2>Dodaj radno mesto</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv:
          <input
            type="text"
            id="workplaceName"
            value={workplaceData.workplaceName}
            onChange={handleChange}
          />
        </label>
        
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddWorkplace;
