import React from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState, useEffect } from "react";
import "../style/style.css"

const UpdateObjectOfLabor = ({ open, setOpen, data, setData, update}) => {
  const handleClose = () => setOpen(false);
  const [warehouses, setWarehouses]=useState();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("warehouse");
        if (res.data) {
          setWarehouses(res.data);
        }
      } catch (error) {
        alert(error);
      }

     

    };

    fetchEmployees();
  }, []);


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !data.objectOfLaborName ||
      !data.description ||
      !data.price ||
      !data.stockQuantity ||
      !data.warehouseId
      )
      {
      alert("Sva polja su obavezna");
      return;
    }

    
    
    try {
        const res = await api.put("objectOfLabor", data);
        if (res.data) {
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
      contentLabel="Izmeni informacije o predmetu rada"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Naziv:
            <input
              type="text"
              id="objectOfLaborName"
              value={data.objectOfLaborName}
              onChange={handleChange}
            />
          </label>
          <label>
            Opis:
            <input
              type="text"
              id="description"
              value={data.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Cena:
            <input
              type="text"
              id="price"
              value={data.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Kolicina:
            <input
              type="text"
              id="stockQuantity"
              value={data.stockQuantity}
              onChange={handleChange}
            />
          </label>
          <label>
        Skladiste:
          <select
            id="warehouseId"
            value={data.warehouseId}
            onChange={handleChange}
          >
            <option value="" >
              Izaberite skladiste
            </option>
            {warehouses ? warehouses.map((workplace) => (
              <option key={workplace.warehouseId} value={workplace.warehouseId}>
                {workplace.address}
              </option>
            )) : <option>Nema</option>}
          </select>
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

export default UpdateObjectOfLabor;
