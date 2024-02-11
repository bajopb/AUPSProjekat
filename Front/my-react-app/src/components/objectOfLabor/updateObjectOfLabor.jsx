import React, { useContext } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState, useEffect } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";

const UpdateObjectOfLabor = ({ open, setOpen, data, setData, update}) => {

  const context=useContext(AuthContext);
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
    if(context.type()!="Admin")
    {
      alert("Izmena je dozvoljena samo administratoru.");
      return;
    }
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
        const res = await api.put("objectOfLabor", data);
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
      contentLabel="Izmeni informacije o predmetu rada"
      ariaHideApp={false}
      style={customStyles}
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
required
            />
          </label>
          <label>
            Opis:
            <input
              type="text"
              id="description"
              value={data.description}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Cena:
            <input
              type="text"
              id="price"
              value={data.price}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Kolicina:
            <input
              type="text"
              id="stockQuantity"
              value={data.stockQuantity}
              onChange={handleChange}
required
            />
          </label>
          <label>
        Skladiste:
          <select
            id="warehouseId"
            value={data.warehouseId}
            onChange={handleChange}
required
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
