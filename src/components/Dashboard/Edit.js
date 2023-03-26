import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';


const Edit = ({ employees, selectedEmployee, setEmployees, setIsEditing }) => {
  const [id,setId] = useState(selectedEmployee.id);
  const [docketNo, setdocketNo] = useState(selectedEmployee.docket_no);
  const [accountNo, setaccountNo] = useState(selectedEmployee.account_no);
  const [product, setproduct] = useState(selectedEmployee.product);
  const [date, setDate] = useState(selectedEmployee.datetime);
  const [activity, setActivity] = useState(selectedEmployee.activity);
  const [segment, setsegment] = useState(selectedEmployee.segment);
  const [customerName, setcustomerName] = useState(selectedEmployee.customer_name);
  const [remarks, setremarks] = useState(selectedEmployee.remarks);
  
  const activities = ['Reactive fault Mgmt','Central Control'];

  
  const updateActivity = async (newActivity)=>{
    console.log(newActivity);
    try{
      const response = await axios.put("http://localhost:8080/api/tsu/"+id,newActivity);
      return response;
    }catch{
      return false;
    }
    
  }
  
  const handleEdit = e => {
    e.preventDefault();

    if (!docketNo || !accountNo || !product || !activity || !date || !customerName || !remarks) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      id,
      docketNo,
      accountNo,
      product,
      segment,
      datetime:date,
      activity,
      customerName,
      remarks

    };

    const res = updateActivity(newEmployee);
    if(res){
  
      Swal.fire({
        icon: 'success',
        title: 'Edited!',
        text: `${docketNo} ${accountNo}'s data has been Edited.`,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsEditing(false);
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
        <h1>Edit Activity</h1>
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
