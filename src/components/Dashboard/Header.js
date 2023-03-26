import React from 'react';
import { Link } from 'react-router-dom';

import Logout from '../Logout';

const Header = ({ setIsAdding, setIsAuthenticated }) => {
  return (
    <header>
      <h1>Activity Management Portal</h1>
      <div style={{ marginTop: '30px', marginBottom: '18px' ,}}>
        <button onClick={() => setIsAdding(true)}>Add Activity</button>
       <Link to={`/user`}> <button style={{float: 'right',marginLeft: '10px'}}>Add Employee</button></Link>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
