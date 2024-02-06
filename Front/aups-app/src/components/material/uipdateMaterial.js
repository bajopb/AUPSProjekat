import { all } from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

const UpdateEmployee = ({ open, setOpen, data, updateMaterials }) => {
 


    const handleUpdate=async(e)=>{
        
        e.preventDefault();
        if(!data.materialName || !data.stockQuantity)
            {alert("Sva polja su obavezna.");
            return;}
        
        const formData= new FormData();
        for(const prop in data)
        formData.append(prop, data[prop]);

        updateMaterials(formData);

        

    };

    const handleChange = (e) => {
        setData({
          ...data,
          [e.target.id]: e.target.value,
        });
      };
  

  

  return (
    <Modal
      open={open}
      onRequestClose={setOpen}
      contentLabel="Izmeni informacije o materijalu"
      ariaHideApp={false} 
    >
      <div className="update-modal">
        <h2>Update Employee</h2>
        <form>
          <label>
            Naziv:
            <input type="text" value={data.firstName} onChange={(e) => handleChange()} />
          </label>
          <label>
            Kolicina:
            <input type="text" value={data.lastName} onChange={(e) => handleChange()} />
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
