import React, { useState }  from "react";
import { useEffect } from "react";

import Employee  from "./employee";
import AddEmployee from "./addEmployee";

const EmployeeList=()=>{

    const [showAddModal, setShowAddModal]=useState(false);

    const [data, setData]=useState({

        employeeId:'',
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        jmbg:'',
        phoneNumber:'',
        address:'',
        city:'',
        sallary:'',
        dateOfEmployment:'',
        workplaceId:'',
        organizationalUnitId:''
    });
    

     useEffect( async ()=>{
        try {
            const res = await api.get("employee");
            return res.data;
        }
        catch(e) {
            alert(e.response.data.Exception);
            return null;
        }

    }, []);

    const handleAdd=async(data)=>{
        try {
            const res = await api.post("employee", data, { headers: { "Content-Type": "multipart/form-data" } });
            if (res.data) {
              refreshEmployees();
              setShowAddModal(false);
            }
          } catch (e) {
            alert(e.response.data.Exception);
          }
    }

    return(<>

        <div className="container info-section">
            <div className="card">
                <div className="card-body">
                    {showAddModal && (<AddEmployee open={showAddModal}
                        setOpen={setShowAddModal}
                        addEmployees={handleAdd}
                    />)}
                    <h5 className="title">
                       Informacije o radnicima 
                    </h5>
                    <table className="table info">
                        <thead>
                        <tr>
                        <th scope="col">Prezime</th>
                        <th scope="col">Ime</th>
                        <th scope="col">Email</th>
                        <th scope="col">Grad</th>
                        <th scope="col">Adresa</th>
                        <th scope="col">Radno mesto</th>
                        <th scope="col">Organizaciona jedinica</th>
                        </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <Employee key={employee.employeeId} employee={employee} refresh={() => fetchData()} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <button type="button" className="btn employee" onClick={handleAdd}>Dodaj radnika</button>
            </div>
        </div>

        </>);
};


export default EmployeeList;