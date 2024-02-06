import React, { useState } from "react";
import Modal from "react-modal";

const AddOrganizationalUnit = ({ isOpen, onRequestClose, onAdd }) => {
  const [organizationalUnitData, setOrganizationalUnitData] = useState({
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setOrganizationalUnitData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(organizationalUnitData);
    setOrganizationalUnitData({
      organizationalUnitName: ""
      
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj organizacionu jedinicu"
      ariaHideApp={false}
    >
      <h2>Dodaj organizacionu jedinicu</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv:
          <input
            type="text"
            id="organizationalUnitName"
            value={organizationalUnitData.organizationalUnitName}
            onChange={handleChange}
          />
        </label>
        
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddOrganizationalUnit;
