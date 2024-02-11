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
      contentLabel="Dodaj organizacionu jedinicu"
      ariaHideApp={false}
      style={customStyles}
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

export default AddOrganizationalUnit;
