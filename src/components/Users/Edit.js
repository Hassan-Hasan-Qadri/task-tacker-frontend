import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const [first_name, setfirst_name] = useState(selectedEmployee.first_name);
  const [last_name, setlast_name] = useState(selectedEmployee.last_name);
  const [phone_number, setphone_number] = useState(selectedEmployee.phone_number);
  const [employee_id_number, setemployee_id_number] = useState(selectedEmployee.employee_id_number);
  const [email, setemail] = useState(selectedEmployee.email);
  const [age, setage] = useState(selectedEmployee.age);
  const [password, setpassword] = useState(selectedEmployee.password);
  
  const [isAdmin, setisAdmin] = useState(selectedEmployee.is_admin);
  
  const resetAll = () =>{
    setfirst_name('')
    setlast_name('')
    setphone_number('')
    setemployee_id_number('')
    setemail('')
    setage('')
    setpassword('')
    setisAdmin(false)
  }
  const postUser = async (newUser)=>{
    const response = await axios.post("http://localhost:8080/api/users",newUser);
    return response;
  }
  
  const handleEdit = e => {
    e.preventDefault();

    const id = employees.length + 1;
    const newEmployee = {
      id,
      first_name,
      last_name,
      phone_number,
      age,
      employee_id_number,
      email,
      password,
      is_admin:isAdmin,

    };

    // employees.push(newEmployee);
    const res = postUser(newEmployee);
    if(res){
      resetAll();
      setEmployees(employees);
  
      Swal.fire({
        icon: 'success',
        title: 'Edited!',
        text: `${first_name} ${last_name}'s data has been Edited.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Editing Failed!',
        text: `failded to edit data.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
  };

  return (
    <div className="small-container">
      <form onSubmit={handleEdit}>
        <h1>Edit User</h1>
        <div className='row'>
          <div className='column'>
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={e => setfirst_name(e.target.value)}
            />
          </div>
          <div className='column'>
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={last_name}
                onChange={e => setlast_name(e.target.value)}
              />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
              <label htmlFor="phone_number">Phone Number</label>
              <input
                id="phone_number"
                type="text"
                name="phone_number"
                value={phone_number}
                onChange={e => setphone_number(e.target.value)}
              />
          </div>
          <div className='column'>
            <label htmlFor="email">email</label>
            <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e)=>{setemail(e.target.value)}}
              />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label htmlFor="age">age</label>
            <input
                id="age"
                type="number"
                name="age"
                value={age}
                onChange={(e)=>{setage(e.target.value)}}
              />
            
          </div>
          <div className='column'>
            <label htmlFor="employee_id_number">Employee ID</label>
            <input
              id="employee_id_number"
              type="text"
              name="employee_id_number"
              value={employee_id_number}
              onChange={e => setemployee_id_number(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setpassword(e.target.value)}
            />
          </div>
          <div className='column'>
            <label htmlFor="password">Is Admin</label>
            <label htmlFor="password"><span>Admin :  
              <input 
              style={{
                marginLeft:"10px",
              }}
              type="checkbox" 
              id="is_admin" 
              name="is_admin" 
              defaultChecked={isAdmin} 
              onChange={(e)=>{
              setisAdmin(e.target.checked);
            }}/>
            </span>
            </label>
        </div>
          </div>
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Edit" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
