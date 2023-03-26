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
            <th>No.</th>
            <th>Docket Number</th>
            <th>Account Number</th>
            <th>Customer Name</th>
            <th>Product</th>
            <th>Activity</th>
            <th>Date</th>
            <th>Segment</th>
            <th>Remarks</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employeesData.length > 0 ? (
            employeesData.map((employee, i) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.docket_no}</td>
                <td>{employee.account_no}</td>
                <td>{employee.customer_name}</td>
                <td>{employee.product}</td>
                <td>{employee.activity}</td>
                <td>{employee.datetime} </td>
                <td>{employee.segment}</td>
                <td>{employee.remarks}</td>
                
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
