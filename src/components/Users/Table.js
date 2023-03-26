import React, { useEffect, useRef, useState } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

const Table = ({ employees, handleEdit, handleDelete }) => {
  
  const [employeesData,setEmployeesData] = useState([]);
  const tableRef = useRef(null);

  const handelSearch = (value) =>{
    const tempEmp =employees.filter((employee)=>{
      let found = false;
      Object.keys(employee).forEach((key)=>{
        if(employee[key]?.toString()?.includes(value)){
          found = true;
        }
      })
      return found;
    })
    setEmployeesData(tempEmp);
  }

  useEffect(()=>{
    setEmployeesData(employees);
  },[employees])

  return (
    <div className="contain-table">
      
      <div style={{display:"flex", justifyContent:'space-between'}}>
        <div style={{display:"flex"}}>
          <label htmlFor="email">Search</label>
            <input
              id="search"
              type="text"
              name="search"
              style={{marginLeft:'5px'}}
              onChange={e=>handelSearch(e.target.value)}
            />
        </div>
         <DownloadTableExcel
                    filename="users table"
                    sheet="users"
                    currentTableRef={tableRef.current}
                >

                   <button> Export excel </button>

                </DownloadTableExcel>
        </div>

      <table className="striped-table" ref={tableRef}> 
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last name</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
            <th>Admin</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employeesData.length > 0 ? (
            employeesData.map((employee, i) => (
              <tr key={employee.id}>
                <td>{employee.employee_id_number}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.age}</td>
                <td>{employee.email}</td>
                <td>{employee.password} </td>
                <td>{employee.is_admin ? <span style={{color: 'green'}}>Admin</span>:<span></span>} </td>
                
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
