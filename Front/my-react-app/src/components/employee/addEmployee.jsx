import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import "../style/style.css"

const AddEmployee = ({ isOpen, onRequestClose, onAddEmployee }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: '-40%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [employeeData, setEmployeeData] = useState({
  });

  const [workplaces, setWorkplaces]=useState();
  const [organizationalUnits, setOrganizationalUnits]=useState();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("workplace");
        if (res.data) {
          setWorkplaces(res.data);
        }
      } catch (error) {
        alert(error);
      }

      try {
        const res = await api.get("organizationalUnit");
        if (res.data) {
          setOrganizationalUnits(res.data);
        }
      } catch (error) {
        alert(error);
      }

    };

    fetchEmployees();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onAddEmployee(employeeData);
    setEmployeeData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      jmbg: "",
      phoneNumber: "",
      address: "",
      city: "",
      sallary: 0,
      dateOfEmployment: new Date(),
      workplaceId: "",
      organizationalUnitId: "",
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Dodaj radnika"
      ariaHideApp={false}
      style={customStyles}
      
      
    >
      <h2>Dodaj radnika</h2>
      <form onSubmit={handleSubmit}>
        {/* Dodajte ostala polja za unos podataka */}
        <label>
          Ime:
          <input
            type="text"
            id="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Prezime:
          <input
            type="text"
            id="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            required

          />
        </label>
        <label>
          Email:
          <input
            type="text"
            id="email"
            value={employeeData.email}
            onChange={handleChange}
            required

          />
        </label>
        <label>
          Lozinka:
          <input
            type="text"
            id="password"
            value={employeeData.password}
            onChange={handleChange}
            required

          />
        </label>
        <label>
          Potvrdi lozinku:
          <input
            type="text"
            id="confirmPassword"
            value={employeeData.confirmPassword}
            onChange={handleChange}
            required

          />
        </label>
        <label>
          Adresa:
          <input
            type="text"
            id="address"
            value={employeeData.address}
            onChange={handleChange}
            required

          />
        </label>
        <label>
          Grad:
          <input
            type="text"
            id="city"
            value={employeeData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          JMBG:
          <input
            type="text"
            id="jmbg"
            value={employeeData.jmbg}
            onChange={handleChange}
          />
        </label>
        <label>
          Broj telefona:
          <input
            type="text"
            id="phoneNumber"
            value={employeeData.phonenumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Datum zaposlenja:
          <input
            type="date"
            id="dateOfEmployment"
            value={employeeData.dateOfEmployment}
            onChange={handleChange}
          />
        </label>
        <label>
          Plata:
          <input
            type="number"
            id="sallary"
            value={employeeData.sallary}
            onChange={handleChange}
          />
        </label>
        <label>
        Radno mesto:
          <select
            id="workplaceId"
            value={employeeData.workplaceId}
            onChange={handleChange}
          >
            <option value="" >
              Izaberite radno mesto
            </option>
            {workplaces ? workplaces.map((workplace) => (
              <option key={workplace.workplaceId} value={workplace.workplaceId}>
                {workplace.workplaceName}
              </option>
            )) : <option>Nema</option>}
          </select>
        </label>
        <label>
        Organizaciona jedinica:
          <select
            id="organizationalUnitId"
            value={employeeData.organizationalUnitId}
            onChange={handleChange}
          >
            <option value="" >
              Izaberite organizacionu jedinicu
            </option>
            {organizationalUnits ? organizationalUnits.map((workplace) => (
              <option key={workplace.organizationalUnitId} value={workplace.organizationalUnitId}>
                {workplace.organizationalUnitName}
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

export default AddEmployee;
