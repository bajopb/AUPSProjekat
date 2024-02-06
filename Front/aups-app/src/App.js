import './App.css';
import Login from './components/login/login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App=()=> {
  return (
    <Routes>
            <Route path="/" element={<Login />} />
            
        </Routes>
  )
}

export default App;
