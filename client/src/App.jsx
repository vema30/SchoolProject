import React from 'react';
import Index from './component/Index';
import Navbar from './component/Navbar';
import Login from './component/Login';
import Register from './component/Register';
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/index" element={<Index />} />
      </Routes>
    </div>
  );
};

export default App;
