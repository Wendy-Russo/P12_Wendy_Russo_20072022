import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router,Routes,Route ,Navigate} from "react-router-dom";
import Dashboard from './Pages/Dashboard'
import Error from './Components/Error/Error';

function App() {
  return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/users/12" />} />
            <Route path="/users/:id" element={<Dashboard/>}/>
            <Route path="/error" element={<Error/>}/>
          </Routes>
        </Router>
      </>
      
  );
}

export default App;
