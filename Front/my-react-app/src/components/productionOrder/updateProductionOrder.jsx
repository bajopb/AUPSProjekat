import React, { useContext } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const UpdateProductionOrder = ({ open, setOpen, data, setData, update}) => {
  const handleClose = () => setOpen(false);
  const context=useContext(AuthContext);
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeNumber=(e)=>{
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setData({
      ...data,
      [e.target.id]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(context.type()!="Admin")
    {
      alert("Izmena je dozvoljena samo administratoru.");
      return;
    }
    console.log(data);
    if (
      !data.startDate || !data.endDate || !data.note || !data.quantity || !data.objectOfLaborId )
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
        const res = await api.put("productionOrder", data);
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
      contentLabel="Izmeni informacije o nalogu za proizvodnju"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Datum pocetka:
            <input
              type="date"
              id="startDate"
              value={data.startDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Datum zavrsetka:
            <input
              type="date"
              id="endDate"
              value={data.endDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Kolicina:
            <input
              type="date"
              id="quantity"
              value={data.quantity}
              onChange={handleChangeNumber}
            />
          </label>
          <label>
            Beleska:
            <input
              type="date"
              id="note"
              value={data.note}
              onChange={handleChange}
            />
          </label>
          <label>
            ID predmeta rada:
            <input
              type="date"
              id="objectOfLaborId"
              value={data.objectOfLaborId}
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

export default UpdateProductionOrder;
