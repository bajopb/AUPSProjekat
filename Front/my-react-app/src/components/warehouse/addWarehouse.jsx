import React, { useState } from "react";
import Modal from "react-modal";

const AddWarehouse = ({ isOpen, onRequestClose, onAdd }) => {
  const [warehouseData, setWarehouseData] = useState({
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setWarehouseData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(warehouseData);
    setWarehouseData({
      address: "",
      city: "",
      capacity: 0
      
    });
    onRequestClose();
  };


  const handleChangeCapacity=(e)=>{
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setWarehouseData({
      ...warehouseData,
      [e.target.id]: value,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj skladiste"
      ariaHideApp={false}
    >
      <h2>Dodaj skladiste</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Adresa:
          <input
            type="text"
            id="address"
            value={warehouseData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Grad:
          <input
            type="text"
            id="city"
            value={warehouseData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          Kapacitet:
          <input
            type="number"
            id="capacity"
            value={warehouseData.capacity}
            onChange={handleChangeCapacity}
          />
        </label>
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddWarehouse;
