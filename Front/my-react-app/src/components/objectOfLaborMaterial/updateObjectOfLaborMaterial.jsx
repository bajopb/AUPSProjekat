import React, { useContext } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState, useEffect } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";

const UpdateObjectOfLaborMaterial = ({ open, setOpen, data, setData, update, objectOfLaborId}) => {
  const context=useContext(AuthContext);
  const handleClose = () => setOpen(false);
  const[materials, setMaterials]=useState();
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("material");
        if (res.data) {
          setMaterials(res.data);
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
      !data.quantity ||
      !data.objectOfLaborId ||
      !data.materialId 
      
      )
      {
      alert("Sva polja su obavezna");
      return;
    }

    const formData=new FormData();
    formData.append("objectOfLaborMaterialId", data.objectOfLaborMaterialId);
    formData.append("quantity", data.quantity);
    formData.append("objectOfLaborId", objectOfLaborId);
    formData.append("materialId", data.materialId);
    
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
        const res = await api.put("objectOfLaborMaterial", formData);
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


  const handleChangeQuantity=(e)=>{
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
      contentLabel="Izmeni informacije o materijalu predmeta rada"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="update-employee-modal">
        <h2>Izmeni</h2>
        <form onSubmit={handleSubmit}>
          
        <label>
            ID predmeta rada:
            <input
              type="text"
              id="objectOfLaborId"
              value={objectOfLaborId}
              disabled
            />
          </label>
          <label>
            Kolicina:
            <input
              type="number"
              id="quantity"
              value={data.quantity}
              onChange={handleChangeQuantity}
              required
            />
          </label>
          
          <label>
        Materijal:
          <select
            id="materialId"
            value={data.materialId}
            onChange={handleChange}
required
          >
            <option value="" >
              Izaberite materijal
            </option>
            {materials ? materials.map((workplace) => (
              <option key={workplace.materialId} value={workplace.materialId}>
                {workplace.materialName}
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

export default UpdateObjectOfLaborMaterial;
