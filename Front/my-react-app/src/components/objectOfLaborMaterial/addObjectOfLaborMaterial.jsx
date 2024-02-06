import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";


const AddObjectOfLaborMaterial = ({ isOpen, onRequestClose, onAdd, objectOfLaborId }) => {
  const [objectOfLaborMaterialData, setObjectOfLaborMaterialData] = useState({
    quantity: 0,
      objectOfLaborId: objectOfLaborId,
      materialId: ""
  });

  const[materials, setMaterials]=useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setObjectOfLaborMaterialData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("quantity", objectOfLaborMaterialData.quantity);
    formData.append("objectOfLaborId", objectOfLaborId);
    formData.append("materialId", objectOfLaborMaterialData.materialId);
    onAdd(formData);
    setObjectOfLaborMaterialData({
      quantity: 0,
      objectOfLaborId: "",
      materialId: ""
      
    });
    onRequestClose();
  };


  const handleChangeQuantity=(e)=>{
    let value = "";
    if (e.target.value) {
      value = e.target.value > 0 ? e.target.value : 0;
    }

    setObjectOfLaborMaterialData({
      ...objectOfLaborMaterialData,
      [e.target.id]: value,
    });
  }


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



  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj materijal za predmet rada"
      ariaHideApp={false}
    >
      <h2>Dodaj predmet rada</h2>
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
              value={objectOfLaborMaterialData.quantity}
              onChange={handleChangeQuantity}
            />
          </label>
          
          <label>
        Materijal:
          <select
            id="materialId"
            value={objectOfLaborMaterialData.materialId}
            onChange={handleChange}
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
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddObjectOfLaborMaterial;
