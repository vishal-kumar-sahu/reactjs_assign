import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import ViewNotes from './pages/ViewNotes';

const Routing = ()=>{
  return(
    <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/notes' element={<ViewNotes />} />
    </Routes>
  )
}

function App() {
  return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
  );
}

export default App;