import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";

const AddObjectOfLabor = ({ isOpen, onRequestClose, onAdd }) => {
  const [objectOfLaborData, setObjectOfLaborData] = useState({
  });


  const [warehouses, setWarehouses]=useState();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setObjectOfLaborData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(objectOfLaborData);
    setObjectOfLaborData({
      objectOfLaborName: ""
      
    });
    onRequestClose();
  };



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


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj predmet rada"
      ariaHideApp={false}
    >
      <h2>Dodaj predmet rada</h2>
      <form onSubmit={handleSubmit}>
      <label>
            Naziv:
            <input
              type="text"
              id="objectOfLaborName"
              value={objectOfLaborData.objectOfLaborName}
              onChange={handleChange}
            />
          </label>
          <label>
            Opis:
            <input
              type="text"
              id="description"
              value={objectOfLaborData.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Cena:
            <input
              type="text"
              id="price"
              value={objectOfLaborData.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Kolicina:
            <input
              type="text"
              id="stockQuantity"
              value={objectOfLaborData.stockQuantity}
              onChange={handleChange}
            />
          </label>
          <label>
        Skladiste:
          <select
            id="warehouseId"
            value={objectOfLaborData.warehouseId}
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
        
                <button type="submit">Dodaj</button>
      </form>
    </Modal>
  );
};

export default AddObjectOfLabor;
