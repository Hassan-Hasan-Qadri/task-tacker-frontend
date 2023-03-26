import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const Add = ({ employees, setEmployees, setIsAdding,editing }) => {
  const [docketNo, setdocketNo] = useState('');
  const [accountNo, setaccountNo] = useState('');
  const [product, setproduct] = useState('');
  const [date, setDate] = useState('');
  const [activity, setActivity] = useState('');
  const [segment, setsegment] = useState('');
  const [customerName, setcustomerName] = useState('');
  const [remarks, setremarks] = useState('');
  
  const activities = ['Reactive fault Mgmt','Central Control'];

  const resetAll = () =>{
    setdocketNo('')
    setaccountNo('')
    setproduct('')
    setDate('')
    setActivity('')
    setsegment('')
    setcustomerName('')
    setremarks('')
  }
  const postActivity = async (newActivity)=>{
    const response = await axios.post("http://localhost:8080/api/tsu",newActivity);
    return response;
  }
  
  const handleAdd = e => {
    e.preventDefault();

    if (!docketNo || !accountNo || !product || !activity || !date || !customerName || !remarks) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      docketNo,
      accountNo,
      product,
      segment,
      date,
      activity,
      customerName,
      remarks

    };

    employees.push(newEmployee);
    const res = postActivity(newEmployee);
    if(res){
      resetAll();
      setEmployees(employees);
  
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${docketNo} ${accountNo}'s data has been Added.`,
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
        <h1>Add Activity</h1>
        <div className='row'>
          <div className='column'>
            <label htmlFor="docketNo">Docket Number</label>
            <input
              id="docketNo"
              type="number"
              name="docketNo"
              value={docketNo}
              onChange={e => setdocketNo(e.target.value)}
            />
          </div>
          <div className='column'>
              <label htmlFor="accountNo">Account Number</label>
              <input
                id="accountNo"
                type="text"
                name="accountNo"
                value={accountNo}
                onChange={e => setaccountNo(e.target.value)}
              />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
              <label htmlFor="product">Product</label>
              <input
                id="product"
                type="text"
                name="product"
                value={product}
                onChange={e => setproduct(e.target.value)}
              />
          </div>
          <div className='column'>
            <label htmlFor="activity">Activity</label>
            <select onChange={(e)=>{setActivity(e.target.value)}}>
                <option>Please choose one option</option>
                    {activities.map((activ, index) => {
                        return <option key={index} >
                            {activ}
                        </option>
                    })}
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label htmlFor="segment">Segment</label>
            <select onChange={(e)=>{setsegment(e.target.value)}}>
                <option>Please choose one option</option>
                    {activities.map((activ, index) => {
                        return <option key={index} >
                            {activ}
                        </option>
                    })}
            </select>
          </div>
          <div className='column'>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <label htmlFor="customerName">Customer Name</label>
            <input
              id="customerName"
              type="text"
              name="customerName"
              value={customerName}
              onChange={e => setcustomerName(e.target.value)}
            />
          </div>
          <div className='column'>
            <label htmlFor="remarks">Remarks</label>
            <input
              id="remarks"
              type="text"
              name="remarks"
              value={remarks}
              onChange={e => setremarks(e.target.value)}
            />

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
