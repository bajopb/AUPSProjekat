import React from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState } from "react";
import "../style/style.css"

const UpdateWarehouse = ({ open, setOpen, data, setData, update}) => {
  const handleClose = () => setOpen(false);
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (
      !data.address || !data.city || !data.capacity )
      {
      alert("Sva polja su obavezna");
      return;
    }

    
    try {
        const res = await api.put("warehouse", data);
        if (res.data) {
            console.log(res.data);
          setData(res.data);
        }
      } catch (error) {
        alert(error);
      }
      update();
    setOpen(false);
  };


  const handleChangeCapacity=(e)=>{
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setData({
      ...data,
      [e.target.id]: value,
    });
  }


  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o skladistu"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Adresa:
            <input
              type="text"
              id="address"
              value={data.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Grad:
            <input
              type="text"
              id="city"
              value={data.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Kapacitet:
            <input
              type="number"
              id="capacity"
              value={data.capacity}
              onChange={handleChangeCapacity}
            />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={handleSubmit}>Izmeni</button>
            
            <button className="close-button" onClick={handleClose}>
              Izadji
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateWarehouse;
