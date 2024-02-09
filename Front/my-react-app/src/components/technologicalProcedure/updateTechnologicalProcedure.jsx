import React, { useContext } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState, useEffect } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const UpdateTechnologicalProcedure = ({ open, setOpen, data, setData, update}) => {
  const handleClose = () => setOpen(false);
  const context=useContext(AuthContext);

  const [organizationalUnits, setOrganizationalUnits]=useState();
  const [plants, setPlants]=useState();
  const [technologicalSystems, setTechnologicalSistems]=useState();


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("organizationalUnit");
        if (res.data) {
            console.log(res.data);
          setOrganizationalUnits(res.data);
        }
      } catch (error) {
        alert(error);
      }

      



    try {
      const res = await api.get("plant");
      if (res.data) {
          console.log(res.data);
        setPlants(res.data);
      }
    } catch (error) {
      alert(error);
    }

    
    try {
      const res = await api.get("technologicalSystem");
      if (res.data) {
          console.log(res.data);
        setTechnologicalSistems(res.data);
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
    if(context.type()!="Admin")
    {
      alert("Izmena je dozvoljena samo administratoru.");
      return;
    }
    console.log(data);
    if (
      !data.technologicalProcedureName || !data.duration || !data.organizationalUnitId ||
      !data.plantId || !data.technologicalSystemId
      
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
        const res = await api.put("technologicalProcedure", data);
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


  const handleChangeDuration=(e)=>{
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
      contentLabel="Izmeni informacije o tehnoloskom postupku"
      ariaHideApp={false}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          
          
          
          <label>
            Naziv:
            <input
              type="text"
              id="technologicalProcedureName"
              value={data.technologicalProcedureName}
              onChange={handleChange}
            />
          </label>
          <label>
            Trajanje:
            <input
              type="number"
              id="duration"
              value={data.duration}
              onChange={handleChangeDuration}
            />
          </label>
          <label>
          Organizaciona jedinica:
          <select
            id="organizationalUnitId"
            value={data.organizationalUnitId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Izaberite organizacionu jedinicu
            </option>
            {organizationalUnits ? organizationalUnits.map((workplace) => (
              <option key={workplace.organizationalUnitId} value={workplace.organizationalUnitId}>
                {workplace.organizationalUnitName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
        <label>
          Postrojenje:
          <select
            id="plantId"
            value={data.plantId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Izaberite postrojenje
            </option>
            {plants ? plants.map((workplace) => (
              <option key={workplace.plantId} value={workplace.plantId}>
                {workplace.plantName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
        <label>
          Tehnoloski sistem:
          <select
            id="technologicalSystemId"
            value={data.technologicalSystemId}
            onChange={handleChange}
          >
            <option value="" disabled>
              Izaberite tehnoloski sistem
            </option>
            {technologicalSystems ? technologicalSystems.map((workplace) => (
              <option key={workplace.technologicalSystemId} value={workplace.technologicalSystemId}>
                {workplace.technologicalSystemName}
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

export default UpdateTechnologicalProcedure;
