import React, { useContext } from "react";
import Modal from "react-modal";
import api from "../../api/api";
import { useState, useEffect } from "react";
import "../style/style.css"
import AuthContext from "../../context/authContext";
import swal from "sweetalert";
const UpdateEmployee = ({ open, setOpen, data, setData, update}) => {
  const context=useContext(AuthContext);
  const handleClose = () => setOpen(false);
  const [password, setPassword] = useState(""); // Dodato
  const [confirmPassword, setConfirmPassword] = useState("");

  const [workplaces, setWorkplaces]=useState();
  const [organizationalUnits, setOrganizationalUnits]=useState();

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

  const handlePasswordChange = (e) => { // Dodato
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => { // Dodato
    setConfirmPassword(e.target.value);
  };
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
    

    const formData=new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      // Dodavanje novih polja 'password' i 'confirmPassword' u 'formData'
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
    
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
          const res = await api.put("employee", formData);
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


  
  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Izmeni informacije o radniku"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="update-employee-modal">
        <h2>Update Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Ime:
            <input
              type="text"
              id="firstName"
              value={data.firstName}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Prezime:
            <input
              type="text"
              id="lastName"
              value={data.lastName}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Lozinka:
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <label>
            Potvrdi lozinku:
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </label>
          <label>
            JMBG:
            <input
              type="text"
              id="jmbg"
              value={data.jmbg}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Adresa:
            <input
              type="text"
              id="address"
              value={data.address}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Grad:
            <input
              type="text"
              id="city"
              value={data.city}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Broj telefona:
            <input
              type="text"
              id="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
required
            />
          </label>
          <label>
            Plata:
            <input
              type="text"
              id="sallary"
              value={data.sallary}
              onChange={handleChange}
required
            />
          </label>
          <label>
        Radno mesto:
          <select
            id="workplaceId"
            value={data.workplaceId}
            onChange={handleChange}
required
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
            value={data.organizationalUnitId}
            onChange={handleChange}
required
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

export default UpdateEmployee;
