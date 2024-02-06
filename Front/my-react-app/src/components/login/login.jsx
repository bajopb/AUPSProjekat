import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import './login.css'


const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email:"",
    password:"",
  });
  const context = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      alert("All fields required.");
      return;
    }

    await context.onLogin(loginForm);
  };

  
  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="label">Email:</label>
          <input
            type="email"
            id="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Password:</label>
          <input
            type="password"
            id="password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            required
            className="input"
          />
        </div>
        <button type="submit" className="submitButton">Login</button>
      </form>
      
    </div>
  );
};

export default Login;