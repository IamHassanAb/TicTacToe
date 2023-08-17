// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Game from './Game';
import Nav from './Nav';
import Home from './Home';



function App() {
  return (
   <div className='App'>
      <Nav/>
      <Routes>
      <Route path="/Game" Component={Game}></Route>
      <Route path="/" exact={true} Component={Home}></Route>

      <Route path="*" Component={PageNotFound}></Route>
      
      </Routes>
      </div>


  );
};



function PageNotFound()
{
  return(
    <>
    <div style={{textAlign:'center'}}>
      <h1>OOPs!</h1>
      <h2>404 - Page Not Found</h2>
      <p>----------------------------------------------------------------------</p>
      <p>Looks like the page you requested does not exist.</p>
    </div>
    </>
  )
}

export default App;
