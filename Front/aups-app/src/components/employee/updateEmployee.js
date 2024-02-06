import { all } from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

const UpdateEmployee = ({ open, setOpen, data, updateEmployees }) => {
 


    const handleUpdate=async(e)=>{
        
        e.preventDefault();
        if(!data.firstName || !data.lastName || !data.address || !data.city || !data.phoneNumber)
            {alert("Sva polja su obavezna.");
            return;}
        
        const formData= new FormData();
        for(const prop in data)
        formData.append(prop, data[prop]);

        updateEmployees(formData);

        

    };

    const handleChange = (e) => {
        setData({
          ...data,
          [e.target.id]: e.target.value,
        });
      };
  

    onUpdate(updatedEmployee);
  

  return (
    <Modal
      open={open}
      onRequestClose={setOpen}
      contentLabel="Izmeni informacije o radniku"
      ariaHideApp={false} 
    >
      <div className="update-modal">
        <h2>Update Employee</h2>
        <form>
          <label>
            Ime:
            <input type="text" value={data.firstName} onChange={(e) => handleChange()} />
          </label>
          <label>
            Prezime:
            <input type="text" value={data.lastName} onChange={(e) => handleChange()} />
          </label>
          <label>
            Adresa:
            <input type="text" value={data.address} onChange={(e) => handleChange()} />
          </label>
          <label>
            Grad:
            <input type="text" value={data.city} onChange={(e) => handleChange()} />
          </label>
          <label>
            Broj telefona:
            <input type="text" value={data.phoneNumber} onChange={(e) => handleChange()} />
          </label>
        </form>
        <div className="modal-buttons">
          <button onClick={handleUpdate}>Izmeni</button>
          <button onClick={setOpen}>Ponisti</button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateEmployee;
