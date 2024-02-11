import React, { useContext } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";

const UpdateWarehouse = ({ open, setOpen, data, setData, update}) => {
  const handleClose = () => setOpen(false);
  const context=useContext(AuthContext);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(context.type()!="Admin")
    {
      alert("Izmena je dozvoljena samo administratoru.");
      return;
    }    if (
      !data.address || !data.city || !data.capacity )
      {
      alert("Sva polja su obavezna");
      return;
    }

    
    const willUpdate = await swal({
      title: "Da li ste sigurni?",
      text: "Da li ste sigurni da zelite da izmenite obrisete ovaj entitet?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Ne", true]
    });
    
    if (willUpdate) {
      swal("Izmenjeno!", "", "success");
      try {
        const res = await api.put("warehouse", data);
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        alert(error);
      }
      update();
    setOpen(false);
    }
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
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o skladistu"
      ariaHideApp={false}
      style={customStyles}
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
required
            />
          </label>
          <label>
            Grad:
            <input
              type="text"
              id="city"
              value={data.city}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Kapacitet:
            <input
              type="number"
              id="capacity"
              value={data.capacity}
              onChange={handleChangeCapacity}
              required
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
