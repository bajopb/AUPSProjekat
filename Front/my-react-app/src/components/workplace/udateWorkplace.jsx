import React from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState } from "react";
import "../style/style.css"

const UpdateWorkplace = ({ open, setOpen, data, setData, update}) => {
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
      !data.workplaceName )
      {
      alert("Sva polja su obavezna");
      return;
    }

    const formData=new FormData();
    formData.append("workplaceName", data.workplaceName);
      formData.append("workplaceId", data.workplaceId);
    
    try {
        const res = await api.put("workplace", formData);
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

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o radnom mestu"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Naziv:
            <input
              type="text"
              id="workplaceName"
              value={data.workplaceName}
              onChange={handleChange}
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

export default UpdateWorkplace;
