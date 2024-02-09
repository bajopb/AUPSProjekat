import React, { useContext } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const UpdatePlant = ({ open, setOpen, data, setData, update}) => {
  const context=useContext(AuthContext);
  const handleClose = () => setOpen(false);
  
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
    }
    console.log(data);
    if (
      !data.plantName )
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
        const res = await api.put("plant", data);
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

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o postrojenju"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Naziv:
            <input
              type="text"
              id="plantName"
              value={data.plantName}
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

export default UpdatePlant;
