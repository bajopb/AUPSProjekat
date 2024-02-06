import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './router/router';
import Navbar from './components/navbar/navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function App() {

const navigate=useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Ovde ispraznite localStorage
      localStorage.clear();
      navigate("/");
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Ovo se izvršava kada se komponenta unmount-uje
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return (
    <div className="App">
      <Navbar/>
      <Router/>
    </div>
  );
}

export default App;
