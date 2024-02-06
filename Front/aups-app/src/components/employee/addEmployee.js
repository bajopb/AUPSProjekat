import React, { useState } from "react";
import Modal from "react-modal";
import api from "../../api/api";

const AddEmployee = ({ open, setOpen, addEmployees }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    address: "",
    workplaceId: "",
    organizationalUnitId: "",
  });

  const handleAdd = async () => {
    addEmployees(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel="Dodaj novog radnika"
      ariaHideApp={false}
    >
      <div className="add-employee-modal">
        <h2>Dodaj radnika</h2>
        <form>
          <label>
            Ime:
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Prezime:
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Grad:
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Adresa:
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Radno mesto:
            <input
              type="text"
              id="workplaceId"
              value={formData.workplaceId}
              onChange={handleChange}
            />
          </label>
          <label>
            Organizaciona jedinica:
            <input
              type="text"
              id="organizationalUnitId"
              value={formData.organizationalUnitId}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="modal-buttons">
          <button onClick={handleAdd}>Dodaj</button>
          <button onClick={() => setOpen(false)}>Izađi</button>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmployee;
