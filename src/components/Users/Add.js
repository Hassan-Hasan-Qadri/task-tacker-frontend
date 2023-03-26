import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const Add = ({ employees, setEmployees, setIsAdding,editing }) => {
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [phone_number, setphone_number] = useState('');
  const [employee_id_number, setemployee_id_number] = useState('');
  const [email, setemail] = useState('');
  const [age, setage] = useState('');
  const [password, setpassword] = useState('');
  
  const [isAdmin, setisAdmin] = useState(false);
  
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
  
  const handleAdd = e => {
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
        title: 'Added!',
        text: `${first_name} ${last_name}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Adding Failed!',
        text: `failded to add data.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add User</h1>
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
            <label htmlFor="password"><span>Admin :  <input type="checkbox" id="is_admin" name="is_admin" value={isAdmin} onChange={(e)=>{
              setisAdmin(e.target.checked);
            }}/>
            </span>
            </label>
        </div>
          </div>
          
         
          
        
        
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
