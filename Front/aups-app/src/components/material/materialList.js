import { ReactDOM, useEffect, useState } from "react";
import React from "react";


const MaterialList=()=>{

const [data, setData]=useState();



useEffect(async()=>{

    try {
        const res = await api.get("material");
        return res.data;
    }
    catch(e) {
        alert(e.response.data.Exception);
        return null;
    }
},[]);

const handleAdd=async(data)=>{

    try {
        const res = await api.post("material", data, { headers: { "Content-Type": "multipart/form-data" } });
        if (res.data) {
          refreshMaterial();
          setShowAddModal(false);
        }
      } catch (e) {
        alert(e.response.data.Exception);
      }
};



    return(

        <div className="container info-section">
            <div className="card">
                <div className="card-body">
                    
                    <h5 className="title">
                       Informacije o materijalima 
                    </h5>
                    <table className="table info">
                        <thead>
                        <tr>
                        <th scope="col">Naziv</th>
                        <th scope="col">Kolicina</th>
                        
                        </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
                <button type="button" className="btn add" onClick={handleAdd}>Dodaj materijal</button>
            </div>
        </div>
    );
};

export default MaterialList;