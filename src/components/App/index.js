import React, { useState, useEffect } from 'react';

import Login from '../Login';
import Dashboard from '../Dashboard';
import Users from '../Users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  const RenderDashbpoard = ()=>{
    if (isAuthenticated)  {
      return <>
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      </>
    } else{
     return  <Login setIsAuthenticated={setIsAuthenticated} />
    }
  }
  
  
  return (
      <Router>
        {isAuthenticated &&  <div style={{display:'flex',   float: 'right' , paddingRight: '10px' ,    marginTop: '15px'}}>
          <FontAwesomeIcon icon={faUser} />
          <span style={{marginLeft:'5px'}}>Admin</span>
        </div>}
        <Routes>
          <Route path="/about">
            {/* <About /> */}
          </Route>
          
          <Route exact path='/crud-app' element={<RenderDashbpoard/>}/>
          <Route exact path='/user' element={<Users setIsAuthenticated={setIsAuthenticated}/>}/>
        </Routes>
    </Router>
     
  );
};

export default App;
