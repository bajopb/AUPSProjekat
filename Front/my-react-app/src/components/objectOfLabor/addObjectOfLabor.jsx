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
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj predmet rada"
      ariaHideApp={false}
      style={customStyles}
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
required
            />
          </label>
          <label>
            Opis:
            <input
              type="text"
              id="description"
              value={objectOfLaborData.description}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Cena:
            <input
              type="text"
              id="price"
              value={objectOfLaborData.price}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Kolicina:
            <input
              type="text"
              id="stockQuantity"
              value={objectOfLaborData.stockQuantity}
              onChange={handleChange}
required
            />
          </label>
          <label>
        Skladiste:
          <select
            id="warehouseId"
            value={objectOfLaborData.warehouseId}
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
        
                <button type="submit">Dodaj</button>
                <button className="close-button" onClick={onRequestClose}>
              Izadji
            </button>
      </form>
    </Modal>
  );
};

export default AddObjectOfLabor;
