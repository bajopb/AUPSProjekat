import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const UpdateProductionOrder = ({ open, setOpen, data, setData, update}) => {
  const [objectOfLabor, setObjectsOfLabor]=useState();
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



  useEffect(() => {
    const fetchObjectsOfLabor = async () => {
      try {
        const res = await api.get("objectOfLabor");
        if (res.data) {
          setObjectsOfLabor(res.data);
        }
      } catch (error) {
        alert(error);
      }

      

    };

    fetchObjectsOfLabor();
  }, []);

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o nalogu za proizvodnju"
      ariaHideApp={false}
      style={customStyles}
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
required
            />
          </label>
          <label>
            Datum zavrsetka:
            <input
              type="date"
              id="endDate"
              value={data.endDate}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Kolicina:
            <input
              type="number"
              id="quantity"
              value={data.quantity}
              onChange={handleChangeNumber}
            />
          </label>
          <label>
            Beleska:
            <input
              type="text"
              id="note"
              value={data.note}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Predmet rada
          <select
            id="objectOfLaborId"
            value={data.objectOfLaborId}
            onChange={handleChange}
required
          >
            <option value="">
              Izaberite predmet rada
            </option>
            {objectOfLabor ? objectOfLabor.map((workplace) => (
              <option key={workplace.objectOfLaborId} value={workplace.objectOfLaborId}>
                {workplace.objectOfLaborName}
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

export default UpdateProductionOrder;
