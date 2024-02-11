import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";
const AddProductionOrder = ({ isOpen, onRequestClose, onAdd }) => {
  const [productionOrderData, setProductionOrderData] = useState({
  });

  const [objectsOfLabor, setObjectsOfLabor]=useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProductionOrderData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(productionOrderData);
    setProductionOrderData({
      startDate: "",
      endDate: "",
      quantity: 0,
      note: "",
      objectOfLaborId: "",
      
    });
    onRequestClose();
  };


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("objectOfLabor");
        if (res.data) {
          setObjectsOfLabor(res.data);
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
      contentLabel="Dodaj nalog za proizvodnju"
      ariaHideApp={false}
      style={customStyles}
    >
      <h2>Dodaj nalog za proizvodnju</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Datum pocetka:
          <input
            type="date"
            id="startDate"
            value={productionOrderData.startDate}
            onChange={handleChange}
required
          />
        </label>
        <label>
          Datum zavrsetka:
          <input
            type="date"
            id="endDate"
            value={productionOrderData.endDate}
            onChange={handleChange}
required
          />
        </label>
        <label>
          Kolicina:
          <input
            type="text"
            id="quantity"
            value={productionOrderData.quantity}
            onChange={handleChange}
required
          />
        </label>
        <label>
          Beleska:
          <input
            type="text"
            id="note"
            value={productionOrderData.note}
            onChange={handleChange}
required
          />
        </label>
        <label>
        Predmet rada:
          <select
            id="objectOfLaborId"
            value={productionOrderData.objectOfLaborId}
            onChange={handleChange}
required
          >
            <option value="">
              Izaberite predmet rada
            </option>
            {objectsOfLabor ? objectsOfLabor.map((workplace) => (
              <option key={workplace.objectOfLaborId} value={workplace.objectOfLaborId}>
                {workplace.objectOfLaborName}
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

export default AddProductionOrder;
